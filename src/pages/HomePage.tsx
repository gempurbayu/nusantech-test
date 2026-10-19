import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { useMovies, type MovieCategory } from "@/features/movies"
import { HeroFeatureSection } from "@/features/movies/sections/HeroFeatureSection"
import { MovieListSection } from "@/features/movies/sections/MovieListSection"
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
      <div className="container max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 flex-1">
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
