import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"

describe("LoadingSpinner component", () => {
  it("renders with default label", () => {
    render(<LoadingSpinner />)
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  it("renders with custom label", () => {
    render(<LoadingSpinner label="Harvesting archival records..." />)
    expect(screen.getByText("Harvesting archival records...")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<LoadingSpinner className="custom-spinner-class" />)
    expect(container.firstChild).toHaveClass("custom-spinner-class")
  })
})
