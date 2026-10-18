import { Link } from "react-router-dom"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTmdbImageUrl } from "@/utils/tmdb"
import { getReleaseYear } from "@/utils/formatDate"
import type { Movie } from "../types"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getTmdbImageUrl(movie.poster_path, "w500")
  const releaseYear = getReleaseYear(movie.release_date)
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-primary rounded-lg transition-transform duration-200 hover:-translate-y-1"
      data-testid="movie-card"
    >
      <Card className="overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-colors h-full flex flex-col">
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-yellow-400 border-none px-2 py-0.5 text-xs font-semibold"
          >
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </Badge>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
              {movie.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {releaseYear}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
