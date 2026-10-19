import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { CategoryTabs } from "./CategoryTabs"

describe("CategoryTabs", () => {
  it("renders all four required categories", () => {
    render(<CategoryTabs activeCategory="now_playing" onCategoryChange={() => {}} />)

    expect(screen.getByRole("tab", { name: /now playing/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /popular/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /top rated/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /upcoming/i })).toBeInTheDocument()
  })

  it("marks the active category as selected", () => {
    render(<CategoryTabs activeCategory="top_rated" onCategoryChange={() => {}} />)

    const activeTab = screen.getByRole("tab", { name: /top rated/i })
    expect(activeTab).toHaveAttribute("aria-selected", "true")

    const inactiveTab = screen.getByRole("tab", { name: /popular/i })
    expect(inactiveTab).toHaveAttribute("aria-selected", "false")
  })

  it("calls onCategoryChange when a category tab is clicked", () => {
    const handleCategoryChange = vi.fn()
    render(<CategoryTabs activeCategory="now_playing" onCategoryChange={handleCategoryChange} />)

    const popularTab = screen.getByRole("tab", { name: /popular/i })
    fireEvent.click(popularTab)

    expect(handleCategoryChange).toHaveBeenCalledWith("popular")
  })
})
