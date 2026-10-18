import { getTmdbImageUrl } from "@/utils/tmdb"
import type { CastMember } from "../types"

interface MovieCastSectionProps {
  cast?: CastMember[]
  limit?: number
}

export function MovieCastSection({ cast = [], limit = 10 }: MovieCastSectionProps) {
  const topCast = cast.slice(0, limit)

  if (topCast.length === 0) {
    return null
  }

  return (
    <section className="space-y-4 pt-6" data-testid="movie-cast-section">
      <h2 className="text-xl font-bold tracking-tight">Main Cast</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {topCast.map((member) => {
          const profileUrl = getTmdbImageUrl(member.profile_path, "w200")
          return (
            <div
              key={member.id}
              className="flex items-center gap-3 rounded-lg border border-border/50 bg-card p-3 shadow-sm"
            >
              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-muted">
                <img
                  src={profileUrl}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-sm truncate">{member.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {member.character}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
