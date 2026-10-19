import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Film, Search, X } from "lucide-react"
import { type MovieCategory } from "@/features/movies/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const CATEGORIES: { label: string; value: MovieCategory }[] = [
  { label: "Now Playing", value: "now_playing" },
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
]

export function Navbar() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const currentCategory = (searchParams.get("category") as MovieCategory) || "now_playing"
  const currentQuery = searchParams.get("q") || ""

  const handleCategoryClick = (category: MovieCategory) => {
    navigate(`/?category=${category}`)
  }

  const handleSearchChange = (query: string) => {
    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set("q", query)
    } else {
      params.delete("q")
    }
    navigate(`/?${params.toString()}`)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-surface/90 backdrop-blur-xl">
      <div className="container max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6 sm:gap-8 flex-shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors">
              <Film className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-[0.18em] uppercase text-foreground leading-none group-hover:text-primary transition-colors">
                NUSAVIE
              </span>
              <span className="text-[10px] tracking-[0.16em] uppercase text-muted-foreground leading-tight mt-1">
                Cinémathèque
              </span>
            </div>
          </Link>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center p-1 rounded-md bg-surface-lowest border border-border/70">
            {CATEGORIES.map((cat) => {
              const isActive = currentCategory === cat.value && !currentQuery
              return (
                <Button
                  key={cat.value}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleCategoryClick(cat.value)}
                  className={cn(
                    "h-8 px-3.5 text-xs font-semibold uppercase tracking-wider transition-all duration-150",
                    !isActive && "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat.label}
                </Button>
              )
            })}
          </nav>
        </div>

        {/* Right: Quick Search Input */}
        <div className="flex items-center gap-3 flex-1 max-w-sm justify-end">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              value={currentQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search titles, vaults..."
              className="h-9 pl-9 pr-8 bg-surface-lowest border-border text-xs placeholder:text-muted-foreground/60 focus-visible:ring-primary"
              data-testid="navbar-search"
            />
            {currentQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSearchChange("")}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
