import { ArrowLeft, Star, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getTmdbImageUrl, getTmdbBackdropUrl } from "@/utils/tmdb"
import { formatFullDate, getReleaseYear } from "@/utils/formatDate"
import type { MovieDetail } from "../types"

interface MovieDetailHeaderSectionProps {
  movie: MovieDetail
}

export function MovieDetailHeaderSection({ movie }: MovieDetailHeaderSectionProps) {
  const navigate = useNavigate()
  const posterUrl = getTmdbImageUrl(movie.poster_path, "w500")
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path, "original")
  const director = movie.credits?.crew.find(
    (crewMember) => crewMember.job === "Director"
  )

  return (
    <section className="relative">
      {/* Backdrop with gradient overlay */}
      <div className="absolute inset-0 -top-16 h-[420px] overflow-hidden opacity-25">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="h-full w-full object-cover object-center filter blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background" />
      </div>

      <div className="relative pt-6">
        {/* Back button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 bg-background/80 backdrop-blur-sm"
          data-testid="back-button"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster Column */}
          <div className="flex justify-center md:justify-start">
            <div className="w-64 md:w-full max-w-[320px] aspect-[2/3] overflow-hidden rounded-xl border border-border shadow-2xl bg-muted">
              <img
                src={posterUrl}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Info Column */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {movie.genres?.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-sm italic text-muted-foreground mt-1">
                  "{movie.tagline}"
                </p>
              )}
            </div>

            {/* Quick meta (Release year, runtime, rating) */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                <Star className="h-4 w-4 fill-yellow-400" />
                <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
                <span className="text-muted-foreground text-xs">
                  ({movie.vote_count} votes)
                </span>
              </div>
              <span>•</span>
              <span>{getReleaseYear(movie.release_date)}</span>
              {movie.runtime && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{movie.runtime} min</span>
                  </div>
                </>
              )}
            </div>

            {/* Synopsis */}
            <div className="space-y-2 pt-2">
              <h2 className="text-lg font-semibold">Synopsis</h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {movie.overview || "No synopsis available for this movie."}
              </p>
            </div>

            {/* Director & Details metadata */}
            <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block text-xs">Director</span>
                <span className="font-medium text-foreground">
                  {director?.name || "Not specified"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">Release Date</span>
                <span className="font-medium text-foreground">
                  {formatFullDate(movie.release_date)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
