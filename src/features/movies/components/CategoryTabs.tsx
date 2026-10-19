import { Button } from "@/components/ui/button"
import { type MovieCategory } from "../types"
import { cn } from "@/lib/utils"

interface CategoryTabsProps {
  activeCategory: MovieCategory
  onCategoryChange: (category: MovieCategory) => void
  disabled?: boolean
}

const CATEGORIES: { label: string; value: MovieCategory }[] = [
  { label: "Now Playing", value: "now_playing" },
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
]

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
  disabled = false,
}: CategoryTabsProps) {
  return (
    <div
      className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-lowest border border-border/80 overflow-x-auto no-scrollbar"
      role="tablist"
      aria-label="Movie category filter"
    >
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.value
        return (
          <Button
            key={cat.value}
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={() => onCategoryChange(cat.value)}
            className={cn(
              "h-8 px-3.5 sm:px-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-150",
              !isActive && "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground mr-2" />}
            <span>{cat.label}</span>
          </Button>
        )
      })}
    </div>
  )
}
