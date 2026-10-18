import { Skeleton } from "@/components/ui/skeleton"
import { MovieCard } from "./MovieCard"
import type { Movie } from "../types"

interface MovieGridProps {
  movies: Movie[]
  isLoading?: boolean
  skeletonCount?: number
}

export function MovieGrid({
  movies,
  isLoading = false,
  skeletonCount = 10,
}: MovieGridProps) {
  if (isLoading && movies.length === 0) {
    return (
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        data-testid="movie-grid-loading"
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/3 rounded" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
      data-testid="movie-grid"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
