import { MovieGrid } from "../components/MovieGrid"
import { ErrorState } from "@/components/common/ErrorState"
import { EmptyState } from "@/components/common/EmptyState"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"
import { Button } from "@/components/ui/button"
import type { Movie } from "../types"

interface MovieListSectionProps {
  movies: Movie[]
  isLoading: boolean
  isError: boolean
  error?: Error | null
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  onLoadMore?: () => void
  onRetry?: () => void
}

export function MovieListSection({
  movies,
  isLoading,
  isError,
  error,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  onRetry,
}: MovieListSectionProps) {
  if (isError) {
    return (
      <ErrorState
        title="Failed to fetch movies"
        message={error?.message}
        onRetry={onRetry}
      />
    )
  }

  if (!isLoading && movies.length === 0) {
    return <EmptyState />
  }

  return (
    <section className="space-y-8">
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
