import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { ErrorState } from "@/components/common/ErrorState"

describe("ErrorState component", () => {
  it("renders default title and message", () => {
    render(<ErrorState />)
    expect(screen.getByRole("heading", { level: 3, name: "Something went wrong" })).toBeInTheDocument()
    expect(
      screen.getByText(/Failed to load data. Please check your network/i)
    ).toBeInTheDocument()
  })

  it("renders custom title and message", () => {
    render(
      <ErrorState
        title="Network Error"
        message="Could not reach TMDB server (401 Unauthorized)."
      />
    )
    expect(screen.getByRole("heading", { level: 3, name: "Network Error" })).toBeInTheDocument()
    expect(
      screen.getByText("Could not reach TMDB server (401 Unauthorized).")
    ).toBeInTheDocument()
  })

  it("renders retry button and triggers onRetry callback when clicked", () => {
    const onRetry = vi.fn()
    render(<ErrorState onRetry={onRetry} />)

    const button = screen.getByRole("button", { name: /Try Again/i })
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it("does not render retry button if onRetry is undefined", () => {
    render(<ErrorState />)
    expect(screen.queryByRole("button", { name: /Try Again/i })).not.toBeInTheDocument()
  })
})
