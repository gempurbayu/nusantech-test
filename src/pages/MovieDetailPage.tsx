import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useMovieDetail } from "@/features/movies"
import { MovieDetailHeaderSection } from "@/features/movies/sections/MovieDetailHeaderSection"
import { MovieCastSection } from "@/features/movies/sections/MovieCastSection"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"
import { ErrorState } from "@/components/common/ErrorState"
import { Button } from "@/components/ui/button"

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: movie, isLoading, isError, error, refetch } = useMovieDetail(id)

  if (isLoading) {
    return (
      <div className="container max-w-7xl px-4 sm:px-8 py-24 flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size={36} label="Loading movie details..." />
      </div>
    )
  }

  if (isError || !movie) {
    return (
      <div className="container max-w-7xl px-4 sm:px-8 py-16 space-y-4">
        <Link to="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Movies</span>
          </Button>
        </Link>
        <ErrorState
          title="Movie not found"
          message={error?.message || "Failed to load movie details."}
          onRetry={() => refetch()}
        />
      </div>
    )
  }

  return (
    <div className="container max-w-7xl px-4 sm:px-8 py-8 space-y-12">
      <MovieDetailHeaderSection movie={movie} />
      <MovieCastSection cast={movie.credits?.cast} limit={10} />
    </div>
  )
}
