import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface TrailerModalProps {
  isOpen: boolean
  onClose: () => void
  videoKey?: string | null
  title?: string
}

export function TrailerModal({
  isOpen,
  onClose,
  videoKey,
  title = "Movie Trailer",
}: TrailerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-4xl p-0 border-border bg-surface-lowest overflow-hidden shadow-2xl"
        data-testid="trailer-modal"
      >
        <DialogHeader className="px-4 py-3 border-b border-border bg-surface-low">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <DialogTitle className="text-sm font-semibold text-foreground truncate max-w-md">
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Video Embed Frame */}
        <div className="relative aspect-video w-full bg-black">
          {videoKey ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0`}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-muted-foreground">
              <p className="text-base font-medium">Trailer not available</p>
              <p className="text-xs mt-1">No official trailer found for this title.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
