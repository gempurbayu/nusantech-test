import { Film } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-border/80 bg-surface-lowest text-muted-foreground pt-12 pb-8 mt-16">
      <div className="container max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-border/60">
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-foreground text-lg font-extrabold tracking-[0.16em] uppercase">
              <Film className="w-5 h-5 text-primary" />
              <span>NUSAVIE</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
              An auteur-grade cinematic platform and archival discovery catalog for discerning
              cinephiles. Powered by the open TMDB API.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
              Categories
            </h4>
            <ul className="space-y-1.5">
              <li>Now Playing</li>
              <li>Popular Titles</li>
              <li>Top Rated Classics</li>
              <li>Upcoming Releases</li>
            </ul>
          </div>

          {/* Col 3: Attribution */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
              Metadata Attribution
            </h4>
            <p className="leading-relaxed">
              Film metadata, posters, and iconography sourced via{" "}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                The Movie Database (TMDB) API
              </a>
              .
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted-foreground/80">
          <p>© {new Date().getFullYear()} NUSAVIE ARCHIVE. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4 uppercase tracking-widest text-[10px]">
            <span>METADATA HARVEST VER. 3.0</span>
            <span>•</span>
            <span>DARKROOM DISPLAY MATRIX</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
