import { MovieGrid } from "@/features/movies/components/MovieGrid"
import { ErrorState } from "@/components/common/ErrorState"
import { EmptyState } from "@/components/common/EmptyState"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { Movie } from "@/features/movies/types"

interface SearchResultsSectionProps {
  query: string
  movies: Movie[]
  isLoading: boolean
  isError: boolean
  error?: Error | null
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  totalResults?: number
  onLoadMore?: () => void
  onRetry?: () => void
  onClearSearch?: () => void
}

export function SearchResultsSection({
  query,
  movies,
  isLoading,
  isError,
  error,
  hasNextPage,
  isFetchingNextPage,
  totalResults,
  onLoadMore,
  onRetry,
  onClearSearch,
}: SearchResultsSectionProps) {
  if (isError) {
    return (
      <div className="py-8">
        <ErrorState
          title="Failed to execute search"
          message={error?.message}
          onRetry={onRetry}
        />
      </div>
    )
  }

  if (!isLoading && movies.length === 0) {
    return (
      <div className="py-8 space-y-4">
        <EmptyState
          title={`No entries matching "${query}"`}
          description="We couldn't locate any films matching your search query in the TMDB catalogue. Try searching by alternate keywords or full title."
        />
        {onClearSearch && (
          <div className="flex justify-center">
            <Button variant="outline" size="sm" onClick={onClearSearch}>
              Clear Search Query
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <section className="space-y-6" data-testid="search-results-section">
      {/* Search Header Banner using Card and Badge */}
      <Card className="p-4 sm:p-5 bg-surface-low border border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mr-1">
            Active Query:
          </span>
          <Badge
            variant="default"
            className="gap-1.5 px-3 py-1 text-xs font-semibold"
          >
            <span>"{query}"</span>
            {onClearSearch && (
              <button
                onClick={onClearSearch}
                className="hover:opacity-80 transition-opacity ml-1"
                aria-label="Remove search filter"
              >
                ✕
              </button>
            )}
          </Badge>
          {onClearSearch && (
            <Button
              variant="link"
              size="sm"
              onClick={onClearSearch}
              className="h-auto p-0 text-primary text-xs font-semibold uppercase tracking-wider hover:underline ml-2"
            >
              Reset Search
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <span className="font-serif text-lg text-primary leading-none">
            {totalResults ? totalResults.toLocaleString() : movies.length}
          </span>
          <span>titles retrieved</span>
        </div>
      </Card>

      {/* Grid of Results */}
      <MovieGrid movies={movies} isLoading={isLoading} />

      {/* Pagination Footer */}
      {hasNextPage && (
        <div className="pt-8 pb-4 flex flex-col items-center gap-3">
          <Button
            variant="surface"
            size="lg"
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            className="min-w-[180px] h-11 text-xs uppercase tracking-wider font-semibold"
          >
            {isFetchingNextPage ? (
              <LoadingSpinner size={16} label="Harvesting more results..." className="p-0 flex-row gap-2" />
            ) : (
              "Load More Search Results"
            )}
          </Button>
        </div>
      )}
    </section>
  )
}
