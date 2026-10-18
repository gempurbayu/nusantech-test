import { Button } from "@/components/ui/button"
import type { MovieCategory } from "../types"

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
    <div className="flex flex-wrap items-center gap-2" role="tablist">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.value
        return (
          <Button
            key={cat.value}
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(cat.value)}
            className="rounded-full px-4 text-xs font-medium"
          >
            {cat.label}
          </Button>
        )
      })}
    </div>
  )
}
