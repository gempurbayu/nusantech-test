import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Film } from "lucide-react"
import { type MovieCategory } from "@/features/movies/types"
import { CategoryTabs } from "@/features/movies/components/CategoryTabs"
import { SearchBar } from "@/features/search/components/SearchBar"

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
              <span className="text-lg font-extrabold tracking-[0.18em] uppercase text-foreground leading-none group-hover:text-primary transition-colors">
                NUSAVIE
              </span>
              <span className="text-[10px] tracking-[0.16em] uppercase text-muted-foreground leading-tight mt-1">
                Cinémathèque
              </span>
            </div>
          </Link>

          {/* Desktop Category Navigation via Reusable CategoryTabs */}
          <div className="hidden md:block">
            <CategoryTabs
              activeCategory={currentCategory}
              onCategoryChange={handleCategoryClick}
            />
          </div>
        </div>

        {/* Right: Quick Search Input via Reusable SearchBar */}
        <div className="flex items-center gap-3 flex-1 max-w-xs sm:max-w-sm justify-end">
          <SearchBar
            value={currentQuery}
            onChange={handleSearchChange}
            placeholder="Search by title, keywords..."
          />
        </div>
      </div>

      {/* Mobile Category Navigation Strip (< md) */}
      <div className="md:hidden border-t border-border/50 px-4 py-2 bg-surface-lowest/80 overflow-x-auto no-scrollbar">
        <CategoryTabs
          activeCategory={currentCategory}
          onCategoryChange={handleCategoryClick}
        />
      </div>
    </header>
  )
}
