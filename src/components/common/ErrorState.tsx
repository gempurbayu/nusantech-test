import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = "Something went wrong",
  message = "Failed to load data. Please check your network or TMDB API configuration.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/10 p-8 text-center">
      <AlertCircle className="h-10 w-10 text-destructive mb-3" />
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="max-w-md text-sm text-muted-foreground mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}
