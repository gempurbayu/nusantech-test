import { Link } from "react-router-dom"
import { Star, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTmdbImageUrl } from "@/utils/tmdb"
import { getReleaseYear } from "@/utils/formatDate"
import { getGenreNames } from "@/utils/genres"
import type { Movie } from "../types"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getTmdbImageUrl(movie.poster_path, "w500")
  const releaseYear = getReleaseYear(movie.release_date)
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"
  const genres = getGenreNames(movie.genre_ids, 2)

  return (
    <Card
      className="group relative flex flex-col bg-surface-low rounded-lg overflow-hidden border border-border/80 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 p-0"
      data-testid="movie-card"
    >
      <Link
        to={`/movie/${movie.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-lg overflow-hidden flex flex-col flex-1"
      >
        {/* Poster Media Frame (2:3 aspect ratio) */}
        <div className="relative w-full aspect-[2/3] overflow-hidden bg-surface-lowest">
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Vignette Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-low via-transparent to-transparent opacity-75 group-hover:opacity-40 transition-opacity" />

          {/* Rating Badge (Top Right) */}
          <Badge
            variant="gold"
            className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded backdrop-blur-md text-xs font-semibold gap-1 border-primary/30"
          >
            <Star className="w-3 h-3 fill-current text-primary" />
            <span className="text-foreground">{rating}</span>
            <span className="text-muted-foreground text-[10px]">/10</span>
          </Badge>

          {/* Release Year Badge (Top Left) */}
          <Badge
            variant="secondary"
            className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded backdrop-blur-sm text-[11px] font-medium"
          >
            {releaseYear}
          </Badge>
        </div>

        {/* Card Metadata Body */}
        <CardContent className="p-3.5 flex flex-col flex-1 justify-between gap-3 bg-surface-low">
          <div className="space-y-1.5">
            <h3 className="font-sans font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {movie.title}
            </h3>

            {/* Genre tags */}
            {genres.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant="surface"
                    className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Footer Action Strip */}
          <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground group-hover:text-primary transition-colors">
            <span className="font-medium text-[11px] uppercase tracking-wider">Inspect Film</span>
            <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
