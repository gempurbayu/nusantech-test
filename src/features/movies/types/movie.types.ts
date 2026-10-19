export type MovieCategory = "now_playing" | "popular" | "top_rated" | "upcoming"

export interface Movie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: number[]
}

export interface Genre {
  id: number
  name: string
}

export interface CastMember {
  id: number
  name: string
  original_name: string
  character: string
  profile_path: string | null
  order: number
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface MovieCredits {
  cast: CastMember[]
  crew: CrewMember[]
}

export interface MovieVideo {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
  published_at: string
}

export interface MovieVideos {
  results: MovieVideo[]
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export interface MovieDetail extends Movie {
  genres: Genre[]
  runtime: number | null
  tagline: string | null
  status: string
  budget: number
  revenue: number
  original_language: string
  production_companies: ProductionCompany[]
  credits?: MovieCredits
  videos?: MovieVideos
}
