import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { renderWithProviders } from "@/test/test-utils"
import { NotFoundPage } from "@/pages/NotFoundPage"

describe("NotFoundPage component", () => {
  it("renders 404 heading and error description", () => {
    renderWithProviders(<NotFoundPage />)

    expect(
      screen.getByRole("heading", { level: 1, name: /404 - Page Not Found/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Sorry, the page you are looking for does not exist or has been moved/i)
    ).toBeInTheDocument()
  })

  it("renders button link directing back to home", () => {
    renderWithProviders(<NotFoundPage />)

    const homeLink = screen.getByRole("link", { name: /Back to Home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute("href", "/")
  })
})
