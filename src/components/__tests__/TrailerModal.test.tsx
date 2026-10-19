import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { TrailerModal } from "@/components/common/TrailerModal"

describe("TrailerModal component", () => {
  it("renders modal with YouTube iframe when isOpen is true and videoKey is provided", () => {
    render(
      <TrailerModal
        isOpen={true}
        onClose={vi.fn()}
        videoKey="Way9Dexny3w"
        title="Dune Part Two Trailer"
      />
    )

    expect(screen.getByTestId("trailer-modal")).toBeInTheDocument()
    expect(screen.getByText("Dune Part Two Trailer")).toBeInTheDocument()

    const iframe = screen.getByTitle("Dune Part Two Trailer")
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/Way9Dexny3w?autoplay=1&rel=0"
    )
  })

  it("renders unavailable notice when videoKey is not provided", () => {
    render(
      <TrailerModal
        isOpen={true}
        onClose={vi.fn()}
        videoKey={null}
        title="Untitled Film"
      />
    )

    expect(screen.getByText("Trailer not available")).toBeInTheDocument()
    expect(
      screen.getByText("No official trailer found for this title.")
    ).toBeInTheDocument()
  })

  it("does not render modal contents when isOpen is false", () => {
    render(
      <TrailerModal
        isOpen={false}
        onClose={vi.fn()}
        videoKey="Way9Dexny3w"
        title="Hidden Trailer"
      />
    )

    expect(screen.queryByTestId("trailer-modal")).not.toBeInTheDocument()
  })
})
