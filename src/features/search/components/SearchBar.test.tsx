import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { SearchBar } from "./SearchBar"

describe("SearchBar", () => {
  it("renders with placeholder and current value", () => {
    render(<SearchBar value="Oppenheimer" onChange={() => {}} />)

    const input = screen.getByTestId("search-input")
    expect(input).toHaveValue("Oppenheimer")
  })

  it("calls onChange when user types", () => {
    const handleChange = vi.fn()
    render(<SearchBar value="" onChange={handleChange} />)

    const input = screen.getByTestId("search-input")
    fireEvent.change(input, { target: { value: "Dune" } })

    expect(handleChange).toHaveBeenCalledWith("Dune")
  })

  it("calls onChange with empty string when clear button is clicked", () => {
    const handleChange = vi.fn()
    render(<SearchBar value="Inception" onChange={handleChange} />)

    const clearButton = screen.getByRole("button", { name: /clear/i })
    fireEvent.click(clearButton)

    expect(handleChange).toHaveBeenCalledWith("")
  })
})
