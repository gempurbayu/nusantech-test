import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { EmptyState } from "@/components/common/EmptyState"

describe("EmptyState component", () => {
  it("renders default title and description", () => {
    render(<EmptyState />)
    expect(screen.getByRole("heading", { level: 3, name: "No movies found" })).toBeInTheDocument()
    expect(
      screen.getByText("Try searching with a different title or keyword.")
    ).toBeInTheDocument()
  })

  it("renders custom title and description when provided", () => {
    render(
      <EmptyState
        title="Custom Empty Title"
        description="Custom description text for testing."
      />
    )
    expect(
      screen.getByRole("heading", { level: 3, name: "Custom Empty Title" })
    ).toBeInTheDocument()
    expect(
      screen.getByText("Custom description text for testing.")
    ).toBeInTheDocument()
  })
})
