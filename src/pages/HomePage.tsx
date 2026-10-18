import { useState, useMemo } from "react"
import { useMovies, type MovieCategory } from "@/features/movies"
import { CategoryTabs } from "@/features/movies/components/CategoryTabs"
import { MovieListSection } from "@/features/movies/sections/MovieListSection"
import { SearchBar } from "@/features/search/components/SearchBar"
import { SearchResultsSection } from "@/features/search/sections/SearchResultsSection"
import { useMovieSearch } from "@/features/search/hooks/useMovieSearch"
import { useDebounce } from "@/hooks/useDebounce"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState<MovieCategory>("popular")
  const [searchQuery, setSearchQuery] = useState("")

  const debouncedQuery = useDebounce(searchQuery, 400)
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

  return (
    <div className="container max-w-7xl px-4 sm:px-8 py-8 space-y-8">
      {/* Hero / Header controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Explore Movies</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Discover trending, top rated, and upcoming movies from TMDB.
          </p>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search movies by title..."
        />
      </div>

      {/* Category Tabs (shown when not searching) */}
      {!isSearching && (
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            disabled={categoryQuery.isLoading && !categoryQuery.data}
          />
        </div>
      )}

      {/* Main Content: Search results or Category list */}
      {isSearching ? (
        <SearchResultsSection
          query={debouncedQuery}
          movies={movies}
          isLoading={searchMoviesQuery.isLoading}
          isError={searchMoviesQuery.isError}
          error={searchMoviesQuery.error as Error}
          hasNextPage={searchMoviesQuery.hasNextPage}
          isFetchingNextPage={searchMoviesQuery.isFetchingNextPage}
          onLoadMore={() => searchMoviesQuery.fetchNextPage()}
          onRetry={() => searchMoviesQuery.refetch()}
        />
      ) : (
        <MovieListSection
          movies={movies}
          isLoading={categoryQuery.isLoading}
          isError={categoryQuery.isError}
          error={categoryQuery.error as Error}
          hasNextPage={categoryQuery.hasNextPage}
          isFetchingNextPage={categoryQuery.isFetchingNextPage}
          onLoadMore={() => categoryQuery.fetchNextPage()}
          onRetry={() => categoryQuery.refetch()}
        />
      )}
    </div>
  )
}
