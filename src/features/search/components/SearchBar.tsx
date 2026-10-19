import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search movies by title...",
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md flex items-center">
      <Search className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 pl-10 pr-20 bg-surface-lowest border-border rounded-lg text-xs sm:text-sm placeholder:text-muted-foreground/60 focus-visible:ring-primary shadow-sm"
        data-testid="search-input"
      />
      <div className="absolute right-2.5 flex items-center gap-1.5">
        {value ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onChange("")}
            className="h-6 px-2 text-[11px] font-semibold text-muted-foreground hover:text-foreground uppercase tracking-wider"
            aria-label="Clear search"
          >
            Clear
          </Button>
        ) : (
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold uppercase bg-surface-container text-muted-foreground rounded border border-border">
            ESC
          </kbd>
        )}
      </div>
    </div>
  )
}
