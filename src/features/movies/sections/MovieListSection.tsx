import { MovieGrid } from "../components/MovieGrid"
import { ErrorState } from "@/components/common/ErrorState"
import { EmptyState } from "@/components/common/EmptyState"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Movie, MovieCategory } from "../types"

interface MovieListSectionProps {
  category: MovieCategory
  movies: Movie[]
  isLoading: boolean
  isError: boolean
  error?: Error | null
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  totalResults?: number
  currentPage?: number
  totalPages?: number
  onLoadMore?: () => void
  onRetry?: () => void
}

const CATEGORY_TITLES: Record<MovieCategory, { title: string; subtitle: string }> = {
  now_playing: {
    title: "Theatrical Engagements & Current Circuit",
    subtitle: "In Theatres Now",
  },
  popular: {
    title: "Trending & Audience Acclaimed",
    subtitle: "Global Box Office & Popular Culture",
  },
  top_rated: {
    title: "The Golden Canon & Essential Classics",
    subtitle: "All-Time Highest Critical Acclaim",
  },
  upcoming: {
    title: "Anticipated Premieres & Future Slates",
    subtitle: "Scheduled Theatrical Releases",
  },
}

export function MovieListSection({
  category,
  movies,
  isLoading,
  isError,
  error,
  hasNextPage,
  isFetchingNextPage,
  totalResults,
  currentPage = 1,
  totalPages = 1,
  onLoadMore,
  onRetry,
}: MovieListSectionProps) {
  if (isError) {
    return (
      <div className="py-8">
        <ErrorState
          title="Failed to harvest movies"
          message={error?.message}
          onRetry={onRetry}
        />
      </div>
    )
  }

  if (!isLoading && movies.length === 0) {
    return (
      <div className="py-8">
        <EmptyState title="No titles found in this category" />
      </div>
    )
  }

  const header = CATEGORY_TITLES[category] || {
    title: "Archival Catalogue",
    subtitle: "Curated Index",
  }

  return (
    <section className="space-y-6" data-testid="movie-list-section">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2 border-b border-border/50">
        <div>
          <Badge variant="gold" className="text-[10px] uppercase tracking-widest font-bold mb-1">
            {header.subtitle}
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-normal tracking-tight mt-1">
            {header.title}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          <span>SORT: TMDB RANK</span>
          <span>•</span>
          <span className="text-primary">
            {totalResults ? `${totalResults.toLocaleString()} TITLES HARVESTED` : `${movies.length} TITLES`}
          </span>
        </div>
      </div>

      {/* Grid of Movie Cards */}
      <MovieGrid movies={movies} isLoading={isLoading} />

      {/* Pagination Footer */}
      {hasNextPage && (
        <div className="pt-8 pb-4 flex flex-col items-center gap-3">
          <Badge variant="surface" className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1">
            DISPLAYING {movies.length} TITLES • PAGE {currentPage} OF {totalPages}
          </Badge>

          <Button
            variant="surface"
            size="lg"
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            className="min-w-[180px] h-11 text-xs uppercase tracking-wider font-semibold"
          >
            {isFetchingNextPage ? (
              <LoadingSpinner size={16} label="Harvesting more titles..." className="p-0 flex-row gap-2" />
            ) : (
              "Load Additional Titles"
            )}
          </Button>

          <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse" />
            Continuous feed sensor active
          </span>
        </div>
      )}
    </section>
  )
}
