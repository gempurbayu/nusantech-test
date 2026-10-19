import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { useMovies, type MovieCategory } from "@/features/movies"
import { CategoryTabs } from "@/features/movies/components/CategoryTabs"
import { HeroFeatureSection } from "@/features/movies/sections/HeroFeatureSection"
import { MovieListSection } from "@/features/movies/sections/MovieListSection"
import { SearchBar } from "@/features/search/components/SearchBar"
import { SearchResultsSection } from "@/features/search/sections/SearchResultsSection"
import { useMovieSearch } from "@/features/search/hooks/useMovieSearch"
import { useDebounce } from "@/hooks/useDebounce"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeCategory = (searchParams.get("category") as MovieCategory) || "now_playing"
  const urlQuery = searchParams.get("q") || ""

  const debouncedQuery = useDebounce(urlQuery, 400)
  const isSearching = debouncedQuery.trim().length > 0

  // Category movies query
  const categoryQuery = useMovies(activeCategory)

  // Search query
  const searchMoviesQuery = useMovieSearch(debouncedQuery)

  // Active query based on mode
  const currentQuery = isSearching ? searchMoviesQuery : categoryQuery

  // Flattened movies list
  const movies = useMemo(() => {
    return currentQuery.data?.pages.flatMap((page) => page.results) ?? []
  }, [currentQuery.data])

  // Featured Hero movie (first movie of category)
  const heroMovie = !isSearching && movies.length > 0 ? movies[0] : undefined

  // Grid movies (skip hero movie on first page if hero is displayed to prevent duplicate)
  const gridMovies = useMemo(() => {
    if (!isSearching && heroMovie) {
      return movies.slice(1)
    }
    return movies
  }, [movies, isSearching, heroMovie])

  // Infinite scroll trigger
  useInfiniteScroll({
    onLoadMore: () => {
      if (currentQuery.hasNextPage && !currentQuery.isFetchingNextPage) {
        currentQuery.fetchNextPage()
      }
    },
    hasMore: Boolean(currentQuery.hasNextPage),
    isLoading: Boolean(currentQuery.isFetchingNextPage),
  })

  const handleCategoryChange = (cat: MovieCategory) => {
    const params = new URLSearchParams()
    params.set("category", cat)
    setSearchParams(params)
  }

  const handleSearchChange = (query: string) => {
    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set("q", query)
    } else {
      params.delete("q")
    }
    setSearchParams(params)
  }

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams)
    params.delete("q")
    setSearchParams(params)
  }

  // Current page count
  const currentPage = currentQuery.data?.pages.length || 1
  const totalPages = currentQuery.data?.pages[0]?.total_pages || 1
  const totalResults = currentQuery.data?.pages[0]?.total_results || movies.length

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Hero Showcase (Visible when not actively searching) */}
      {!isSearching && heroMovie && <HeroFeatureSection movie={heroMovie} />}

      {/* Main Content Area */}
      <div className="container max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex-1">
        {/* Curatorial Filter & Search Strip */}
        <div className="sticky top-16 z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-3 bg-background/90 backdrop-blur-md border-b border-border/60">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category switcher pills (when not searching) */}
            {!isSearching ? (
              <CategoryTabs
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                disabled={categoryQuery.isLoading && !categoryQuery.data}
              />
            ) : (
              <div className="text-xs font-semibold uppercase tracking-widest text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Search Mode</span>
              </div>
            )}

            {/* Quick Filter Search Bar */}
            <SearchBar
              value={urlQuery}
              onChange={handleSearchChange}
              placeholder="Search by title, keywords..."
            />
          </div>
        </div>

        {/* Content: Search results or Category list */}
        {isSearching ? (
          <SearchResultsSection
            query={debouncedQuery}
            movies={movies}
            isLoading={searchMoviesQuery.isLoading}
            isError={searchMoviesQuery.isError}
            error={searchMoviesQuery.error as Error}
            hasNextPage={searchMoviesQuery.hasNextPage}
            isFetchingNextPage={searchMoviesQuery.isFetchingNextPage}
            totalResults={totalResults}
            onLoadMore={() => searchMoviesQuery.fetchNextPage()}
            onRetry={() => searchMoviesQuery.refetch()}
            onClearSearch={handleClearSearch}
          />
        ) : (
          <MovieListSection
            category={activeCategory}
            movies={gridMovies}
            isLoading={categoryQuery.isLoading}
            isError={categoryQuery.isError}
            error={categoryQuery.error as Error}
            hasNextPage={categoryQuery.hasNextPage}
            isFetchingNextPage={categoryQuery.isFetchingNextPage}
            totalResults={totalResults}
            currentPage={currentPage}
            totalPages={totalPages}
            onLoadMore={() => categoryQuery.fetchNextPage()}
            onRetry={() => categoryQuery.refetch()}
          />
        )}
      </div>
    </div>
  )
}
