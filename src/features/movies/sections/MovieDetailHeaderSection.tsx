import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Play, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"
import { TrailerModal } from "@/components/common/TrailerModal"
import { getTmdbImageUrl, getTmdbBackdropUrl } from "@/utils/tmdb"
import { formatFullDate, getReleaseYear } from "@/utils/formatDate"
import type { MovieDetail } from "../types"

interface MovieDetailHeaderSectionProps {
  movie: MovieDetail
}

export function MovieDetailHeaderSection({ movie }: MovieDetailHeaderSectionProps) {
  const navigate = useNavigate()
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)

  const posterUrl = getTmdbImageUrl(movie.poster_path, "w500")
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path, "original")
  const releaseYear = getReleaseYear(movie.release_date)
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"

  // Crew lookups
  const director = movie.credits?.crew.find((c) => c.job === "Director")
  const screenplay = movie.credits?.crew.find(
    (c) => c.job === "Screenplay" || c.job === "Writer"
  )
  const producer = movie.credits?.crew.find((c) => c.job === "Producer")

  // Trailer lookup
  const trailer =
    movie.videos?.results.find(
      (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
    ) || movie.videos?.results.find((v) => v.site === "YouTube")

  // Format currency
  const formatCurrency = (amount?: number) => {
    if (!amount || amount <= 0) return "Not Disclosed"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <section className="relative w-full">
      {/* Ambient Backdrop Scrim Layer */}
      <div className="absolute inset-0 -top-24 h-[550px] md:h-[680px] overflow-hidden pointer-events-none opacity-25 filter blur-[2px]">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      <div className="relative z-10 pt-4 space-y-8">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="surface"
            size="sm"
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 backdrop-blur-md text-xs font-semibold uppercase tracking-wider"
            data-testid="back-button"
          >
            <ArrowLeft className="w-4 h-4 transform transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Movie Catalog</span>
          </Button>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Archival Entry TMDB-{movie.id}</span>
          </div>
        </div>

        {/* 2-Column Hero Grid: Left Poster & Trailer, Right Metadata */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Column Left: Poster & Watch Trailer CTA */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-3.5 w-full max-w-[260px] sm:max-w-[280px] mx-auto lg:mx-0">
            <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-surface-lowest border border-border shadow-2xl group">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                <Badge
                  variant="gold"
                  className="backdrop-blur-md text-[10px] uppercase tracking-widest font-semibold"
                >
                  {movie.status || "Released"}
                </Badge>
              </div>
            </div>

            {/* Watch Trailer Button */}
            <Button
              onClick={() => setIsTrailerOpen(true)}
              disabled={!trailer}
              className="w-full h-11 uppercase tracking-wider gap-2 shadow-lg text-xs font-semibold"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{trailer ? "Watch Official Trailer" : "Trailer Unavailable"}</span>
            </Button>
          </div>

          {/* Column Right: Details, Ratings, Synopsis, Key Credits */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Tagline & Title */}
            <div className="space-y-2">
              {movie.tagline && (
                <p className="italic text-primary text-base sm:text-lg tracking-wide">
                  "{movie.tagline}"
                </p>
              )}
              <h1 className="text-3xl sm:text-5xl text-foreground font-bold tracking-tight leading-tight">
                {movie.title}
              </h1>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span className="text-foreground">{releaseYear}</span>
              <span>•</span>
              {movie.runtime && (
                <>
                  <div className="flex items-center gap-1 text-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{movie.runtime} MIN</span>
                  </div>
                  <span>•</span>
                </>
              )}
              <span className="text-primary">{movie.status || "Released"}</span>
              {movie.original_language && (
                <>
                  <span>•</span>
                  <span>Lang: {movie.original_language.toUpperCase()}</span>
                </>
              )}
            </div>

            {/* TMDB User Score Block */}
            <Card className="p-4 rounded-xl bg-surface-low border border-border/80 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                {/* Score Pill / Radial Gauge */}
                <div className="w-14 h-14 rounded-full bg-surface-container border-2 border-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-foreground">
                    {rating}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      TMDB User Score
                    </span>
                    <Badge variant="surface" className="text-[10px] px-1.5 py-0.2 uppercase">
                      Audience Verified
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    Based on{" "}
                    <strong className="text-foreground font-semibold">
                      {movie.vote_count.toLocaleString()} recorded ballots
                    </strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round((movie.vote_average || 0) / 2)
                        ? "fill-current text-primary"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </Card>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mr-1">
                  Genres:
                </span>
                {movie.genres.map((genre) => (
                  <Badge
                    key={genre.id}
                    variant="surface"
                    className="px-3 py-1 text-xs uppercase tracking-wider"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Synopsis */}
            <div className="space-y-2 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                Synopsis &amp; Premise
              </h2>
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
                {movie.overview || "No synopsis available for this film."}
              </p>
            </div>

            <Separator className="bg-border/60" />

            {/* Key Production & Direction Credits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <Card className="p-3.5 bg-surface-low border border-border/70 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Director
                </span>
                <span className="text-sm font-semibold text-foreground block">
                  {director?.name || "Not specified"}
                </span>
                <span className="text-[11px] text-primary block">Directing</span>
              </Card>

              <Card className="p-3.5 bg-surface-low border border-border/70 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Screenplay &amp; Writing
                </span>
                <span className="text-sm font-semibold text-foreground block truncate">
                  {screenplay?.name || "Not specified"}
                </span>
                <span className="text-[11px] text-muted-foreground block">Writing</span>
              </Card>

              <Card className="p-3.5 bg-surface-low border border-border/70 space-y-1 sm:col-span-2 md:col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Producer
                </span>
                <span className="text-sm font-semibold text-foreground block truncate">
                  {producer?.name || "Not specified"}
                </span>
                <span className="text-[11px] text-muted-foreground block">Production</span>
              </Card>
            </div>
          </div>
        </div>

        {/* Curatorial Data Ledger: Real Financial & Production Metrics */}
        <Card className="mt-10 p-5 bg-surface-low border border-border/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/50">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Financials &amp; Archival Specifications
            </span>
            <Badge variant="surface" className="font-mono text-[10px] uppercase">
              TMDB_LEDGER
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Production Budget
              </span>
              <span className="text-sm sm:text-base font-bold text-foreground block font-mono">
                {formatCurrency(movie.budget)}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Global Box Office
              </span>
              <span className="text-sm sm:text-base font-bold text-primary block font-mono">
                {formatCurrency(movie.revenue)}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Release Date
              </span>
              <span className="text-sm sm:text-base font-medium text-foreground block">
                {formatFullDate(movie.release_date)}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Production Studio
              </span>
              <span className="text-sm sm:text-base font-medium text-foreground block truncate">
                {movie.production_companies?.[0]?.name || "Independent"}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        videoKey={trailer?.key}
        title={`${movie.title} — Official Trailer`}
      />
    </section>
  )
}
