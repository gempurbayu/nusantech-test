import { MovieGrid } from "@/features/movies/components/MovieGrid"
import { ErrorState } from "@/components/common/ErrorState"
import { EmptyState } from "@/components/common/EmptyState"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/features/movies/types"

interface SearchResultsSectionProps {
  query: string
  movies: Movie[]
  isLoading: boolean
  isError: boolean
  error?: Error | null
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  onLoadMore?: () => void
  onRetry?: () => void
}

export function SearchResultsSection({
  query,
  movies,
  isLoading,
  isError,
  error,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  onRetry,
}: SearchResultsSectionProps) {
  if (isError) {
    return (
      <ErrorState
        title="Failed to search movies"
        message={error?.message}
        onRetry={onRetry}
      />
    )
  }

  if (!isLoading && movies.length === 0) {
    return (
      <EmptyState
        title={`No results for "${query}"`}
        description="We couldn't find any movies matching your search query. Try another title."
      />
    )
  }

  return (
    <section className="space-y-6" data-testid="search-results-section">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">
          Search Results for <span className="text-primary">"{query}"</span>
        </h2>
        <span className="text-sm text-muted-foreground">
          {movies.length} {movies.length === 1 ? "movie" : "movies"} loaded
        </span>
      </div>

      <MovieGrid movies={movies} isLoading={isLoading} />

      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            className="min-w-[160px]"
          >
            {isFetchingNextPage ? (
              <LoadingSpinner size={16} label="Loading more..." className="p-0 flex-row gap-2" />
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </section>
  )
}
