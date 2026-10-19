import { useState } from "react"
import { Link } from "react-router-dom"
import { Film, Play, Star, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrailerModal } from "@/components/common/TrailerModal"
import { getTmdbBackdropUrl } from "@/utils/tmdb"
import { getReleaseYear } from "@/utils/formatDate"
import { getGenreNames } from "@/utils/genres"
import { movieApi } from "../api"
import type { Movie } from "../types"

interface HeroFeatureSectionProps {
  movie?: Movie
}

export function HeroFeatureSection({ movie }: HeroFeatureSectionProps) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false)

  if (!movie) return null

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path, "original")
  const releaseYear = getReleaseYear(movie.release_date)
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"
  const genres = getGenreNames(movie.genre_ids, 2)

  const handlePlayTrailer = async () => {
    setIsTrailerOpen(true)
    if (!trailerKey) {
      try {
        setIsLoadingTrailer(true)
        const videos = await movieApi.getMovieVideos(movie.id)
        const trailer =
          videos?.find(
            (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
          ) || videos?.find((v) => v.site === "YouTube")
        setTrailerKey(trailer?.key || null)
      } catch (err) {
        console.error("Failed to fetch trailer video", err)
        setTrailerKey(null)
      } finally {
        setIsLoadingTrailer(false)
      }
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-surface-lowest -mt-8 mb-8 border-b border-border/60">
      <div className="relative w-full min-h-[520px] lg:h-[620px] flex items-end">
        {/* Cinematic Backdrop with Scrim Dissolves */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out scale-[1.01]"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          {/* Dual Multi-stop Gradient Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent w-full lg:w-3/4" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-24">
          <div className="max-w-3xl space-y-4">
            {/* Tag Badge */}
            <div className="flex items-center gap-2.5">
              <Badge variant="gold" className="gap-1.5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Featured Premiere
              </Badge>
              <span className="text-muted-foreground text-[11px] tracking-widest uppercase font-semibold">
                TMDB Archival Spotlight
              </span>
            </div>

            {/* Title in Plus Jakarta Sans */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl text-foreground font-extrabold tracking-tight text-balance leading-tight">
              {movie.title}
            </h1>

            {/* High-density Meta Row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 bg-surface-container/90 px-2.5 py-1 rounded border border-border text-primary font-semibold">
                <Star className="w-3.5 h-3.5 fill-current text-primary" />
                <span className="text-foreground">{rating}</span>
                <span className="text-muted-foreground/70 text-[10px]">/ 10</span>
              </div>
              <span>•</span>
              <span className="font-medium text-foreground">{releaseYear}</span>
              {genres.length > 0 && (
                <>
                  <span>•</span>
                  <span>{genres.join(" / ")}</span>
                </>
              )}
              <span>•</span>
              <span>{movie.vote_count.toLocaleString()} votes</span>
            </div>

            {/* Synopsis */}
            <p className="text-sm sm:text-base text-muted-foreground line-clamp-3 leading-relaxed max-w-2xl pt-1">
              {movie.overview || "No synopsis available for this title."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link to={`/movie/${movie.id}`}>
                <Button className="h-11 px-6 bg-primary text-primary-foreground font-semibold hover:bg-gold-light transition-colors gap-2 shadow-lg">
                  <Film className="w-4 h-4" />
                  <span>View Film Details</span>
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={handlePlayTrailer}
                disabled={isLoadingTrailer}
                className="h-11 px-5 bg-surface-container/80 hover:bg-surface-high border-border text-foreground hover:text-primary gap-2 transition-colors"
              >
                {isLoadingTrailer ? (
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                ) : (
                  <Play className="w-4 h-4 fill-current text-primary" />
                )}
                <span>Play Trailer</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        videoKey={trailerKey}
        title={`${movie.title} — Official Trailer`}
      />
    </section>
  )
}
