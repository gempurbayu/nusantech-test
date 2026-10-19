import { Card } from "@/components/ui/card"
import { getTmdbImageUrl } from "@/utils/tmdb"
import type { CastMember } from "../types"

interface MovieCastSectionProps {
  cast?: CastMember[]
  limit?: number
}

export function MovieCastSection({ cast = [], limit = 6 }: MovieCastSectionProps) {
  const topCast = cast.slice(0, limit)

  if (topCast.length === 0) {
    return null
  }

  return (
    <section className="mt-12 pt-8 border-t border-border/60 space-y-6" data-testid="movie-cast-section">
      <div className="flex items-baseline justify-between pb-2 border-b border-border/40">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary block">
            Principal Ensemble
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-normal tracking-tight mt-0.5">
            Cast &amp; Key Personas
          </h3>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {topCast.length} Headlining Talents
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {topCast.map((member) => {
          const profileUrl = getTmdbImageUrl(member.profile_path, "w300")
          return (
            <Card
              key={member.id}
              className="group flex flex-col bg-surface-low rounded-lg overflow-hidden border border-border/70 hover:border-primary/50 shadow-sm transition-all duration-200 p-0"
            >
              {/* Headshot Portrait (3:4 ratio) */}
              <div className="w-full aspect-[3/4] overflow-hidden bg-surface-lowest relative">
                <img
                  src={profileUrl}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Actor & Character Info */}
              <div className="p-3 flex flex-col gap-0.5 bg-surface-low">
                <span className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                  {member.name}
                </span>
                <span className="text-[11px] text-muted-foreground truncate">
                  {member.character || "Cast"}
                </span>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
