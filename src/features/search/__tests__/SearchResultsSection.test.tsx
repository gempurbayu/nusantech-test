import { describe, it, expect, vi } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
import { renderWithProviders } from "@/test/test-utils"
import { SearchResultsSection } from "@/features/search/sections/SearchResultsSection"
import type { Movie } from "@/features/movies/types"

const mockSearchResults: Movie[] = [
  {
    id: 1,
    title: "Inception",
    original_title: "Inception",
    overview: "A thief who steals corporate secrets through dream-sharing technology.",
    poster_path: "/inception.jpg",
    backdrop_path: "/inception_bg.jpg",
    release_date: "2010-07-15",
    vote_average: 8.8,
    vote_count: 35000,
    popularity: 250.5,
    genre_ids: [28, 878],
  },
]

describe("SearchResultsSection component", () => {
  it("renders ErrorState when isError is true", () => {
    const onRetry = vi.fn()
    renderWithProviders(
      <SearchResultsSection
        query="Inception"
        movies={[]}
        isLoading={false}
        isError={true}
        error={new Error("TMDB network timeout")}
        onRetry={onRetry}
      />
    )

    expect(screen.getByText("Failed to execute search")).toBeInTheDocument()
    expect(screen.getByText("TMDB network timeout")).toBeInTheDocument()

    const retryBtn = screen.getByRole("button", { name: /Try Again/i })
    fireEvent.click(retryBtn)
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it("renders EmptyState when no results match and isLoading is false", () => {
    const onClearSearch = vi.fn()
    renderWithProviders(
      <SearchResultsSection
        query="nonexistentfilm123"
        movies={[]}
        isLoading={false}
        isError={false}
        onClearSearch={onClearSearch}
      />
    )

    expect(
      screen.getByText(/No entries matching "nonexistentfilm123"/i)
    ).toBeInTheDocument()

    const clearBtn = screen.getByRole("button", { name: /Clear Search Query/i })
    fireEvent.click(clearBtn)
    expect(onClearSearch).toHaveBeenCalledTimes(1)
  })

  it("renders retrieved movies and metadata banner when results exist", () => {
    renderWithProviders(
      <SearchResultsSection
        query="Inception"
        movies={mockSearchResults}
        isLoading={false}
        isError={false}
        totalResults={1}
      />
    )

    expect(screen.getByRole("heading", { level: 3, name: "Inception" })).toBeInTheDocument()
    expect(screen.getByText("titles retrieved")).toBeInTheDocument()
  })

  it("renders load more button and triggers onLoadMore callback when hasNextPage is true", () => {
    const onLoadMore = vi.fn()
    renderWithProviders(
      <SearchResultsSection
        query="Inception"
        movies={mockSearchResults}
        isLoading={false}
        isError={false}
        hasNextPage={true}
        isFetchingNextPage={false}
        onLoadMore={onLoadMore}
      />
    )

    const loadMoreBtn = screen.getByRole("button", { name: /Load More Search Results/i })
    expect(loadMoreBtn).toBeInTheDocument()

    fireEvent.click(loadMoreBtn)
    expect(onLoadMore).toHaveBeenCalledTimes(1)
  })
})
