import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook } from "@testing-library/react"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"

describe("useInfiniteScroll hook", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("adds scroll event listener when hasMore is true and isLoading is false", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener")
    const onLoadMore = vi.fn()
    renderHook(() =>
      useInfiniteScroll({
        onLoadMore,
        hasMore: true,
        isLoading: false,
      })
    )

    expect(addEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function), {
      passive: true,
    })
  })

  it("removes scroll event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener")
    const onLoadMore = vi.fn()
    const { unmount } = renderHook(() =>
      useInfiniteScroll({
        onLoadMore,
        hasMore: true,
        isLoading: false,
      })
    )

    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function))
  })

  it("does not attach listener if hasMore is false", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener")
    const onLoadMore = vi.fn()
    renderHook(() =>
      useInfiniteScroll({
        onLoadMore,
        hasMore: false,
        isLoading: false,
      })
    )

    expect(addEventListenerSpy).not.toHaveBeenCalled()
  })

  it("does not attach listener if isLoading is true", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener")
    const onLoadMore = vi.fn()
    renderHook(() =>
      useInfiniteScroll({
        onLoadMore,
        hasMore: true,
        isLoading: true,
      })
    )

    expect(addEventListenerSpy).not.toHaveBeenCalled()
  })

  it("triggers onLoadMore when scroll position reaches bottom threshold", () => {
    const onLoadMore = vi.fn()

    // Mock window scroll properties
    Object.defineProperty(window, "innerHeight", { value: 800, writable: true })
    Object.defineProperty(window, "scrollY", { value: 1000, writable: true })
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 1900,
      writable: true,
    })

    renderHook(() =>
      useInfiniteScroll({
        onLoadMore,
        hasMore: true,
        isLoading: false,
        threshold: 300,
      })
    )

    // Trigger scroll event (1900 - (800 + 1000) = 100 <= 300)
    window.dispatchEvent(new Event("scroll"))
    expect(onLoadMore).toHaveBeenCalledTimes(1)
  })
})
