import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: number
  label?: string
}

export function LoadingSpinner({
  className,
  size = 28,
  label = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 p-8", className)}>
      <Loader2 className="animate-spin text-primary" style={{ width: size, height: size }} />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  )
}
