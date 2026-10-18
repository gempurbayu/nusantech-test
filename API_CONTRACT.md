# TMDB API Contract

Dokumentasi ini merangkum seluruh endpoint TMDB (The Movie Database) API v3 yang dibutuhkan berdasarkan **Technical Test Requirements**, lengkap dengan parameter, format request, response schema, dan tipe data TypeScript.

---

## 1. Konfigurasi Dasar & Autentikasi

* **Base URL:** `https://api.themoviedb.org/3`
* **Image Base URL:** `https://image.tmdb.org/t/p`
* **Autentikasi (Pilih salah satu):**
  1. **Bearer Token (Recommended):**
     ```http
     Authorization: Bearer <TMDB_READ_ACCESS_TOKEN>
     ```
  2. **API Key (Query Parameter):**
     ```http
     ?api_key=<TMDB_API_KEY>
     ```
* **Content-Type:** `application/json`

---

## 2. Pemetaan Fitur & Kebutuhan API

| No | Kebutuhan Fitur (Test Requirement) | TMDB Endpoint | Method | Keterangan |
|---|---|---|---|---|
| 1 | **Movie List & Pagination** | `/movie/{category}` | `GET` | Menampilkan card list (title, release year, poster) & paging |
| 2 | **Filter Category: Now Playing** | `/movie/now_playing` | `GET` | Film yang sedang tayang di bioskop |
| 3 | **Filter Category: Popular** | `/movie/popular` | `GET` | Film terpopuler saat ini (default) |
| 4 | **Filter Category: Top Rated** | `/movie/top_rated` | `GET` | Film dengan rating tertinggi sepanjang masa |
| 5 | **Filter Category: Upcoming** | `/movie/upcoming` | `GET` | Film yang akan segera tayang |
| 6 | **Movie Search** | `/search/movie` | `GET` | Cari film berdasarkan keyword judul |
| 7 | **Movie Detail, Cast & Director** | `/movie/{movie_id}` | `GET` | Menggunakan `append_to_response=credits` untuk sinopsis, poster, sutradara, & cast dalam 1 request |

---

## 3. Spesifikasi Endpoint

### A. Movie List by Category (`Now Playing`, `Popular`, `Top Rated`, `Upcoming`)

Mengambil daftar film berdasarkan kategori dengan dukungan pagination.

* **Endpoint:**
  * `GET /movie/now_playing`
  * `GET /movie/popular`
  * `GET /movie/top_rated`
  * `GET /movie/upcoming`
* **Query Parameters:**
  | Parameter | Tipe | Wajib? | Default | Keterangan |
  |---|---|---|---|---|
  | `page` | `integer` | Tidak | `1` | Nomor halaman data (pagination) |
  | `language` | `string` | Tidak | `en-US` | Format bahasa respon |

* **Sample Request:**
  ```http
  GET /movie/popular?page=1&language=en-US HTTP/1.1
  Host: api.themoviedb.org/3
  Authorization: Bearer <TOKEN>
  ```

* **Sample Success Response (`200 OK`):**
  ```json
  {
    "page": 1,
    "results": [
      {
        "id": 933260,
        "title": "The Substance",
        "original_title": "The Substance",
        "overview": "A fading celebrity decides to use a black market drug...",
        "poster_path": "/lqoMzCcZYEFK729Fc6r3pf2NTne.jpg",
        "backdrop_path": "/7h6r93ooEjGQtICVgCyvRAd9fUV.jpg",
        "release_date": "2024-09-07",
        "vote_average": 7.3,
        "vote_count": 2150,
        "popularity": 1420.5,
        "genre_ids": [27, 878]
      }
    ],
    "total_pages": 48120,
    "total_results": 962384
  }
  ```

---

### B. Search Movie by Title

Mencari film berdasarkan query judul teks pengguna.

* **Endpoint:** `GET /search/movie`
* **Query Parameters:**
  | Parameter | Tipe | Wajib? | Default | Keterangan |
  |---|---|---|---|---|
  | `query` | `string` | **Ya** | - | Keyword judul film yang dicari |
  | `page` | `integer` | Tidak | `1` | Nomor halaman (pagination) |
  | `include_adult` | `boolean` | Tidak | `false` | Filter konten dewasa |
  | `language` | `string` | Tidak | `en-US` | Format bahasa |

* **Sample Request:**
  ```http
  GET /search/movie?query=Inception&page=1 HTTP/1.1
  Host: api.themoviedb.org/3
  Authorization: Bearer <TOKEN>
  ```

* **Sample Success Response (`200 OK`):**
  ```json
  {
    "page": 1,
    "results": [
      {
        "id": 27205,
        "title": "Inception",
        "original_title": "Inception",
        "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious...",
        "poster_path": "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
        "backdrop_path": "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
        "release_date": "2010-07-15",
        "vote_average": 8.4,
        "vote_count": 35600,
        "popularity": 87.4,
        "genre_ids": [28, 878, 12]
      }
    ],
    "total_pages": 4,
    "total_results": 74
  }
  ```

---

### C. Movie Details, Cast & Director

Mengambil detail lengkap sebuah film (sinopsis, poster, sutradara, pemeran utama) sekaligus dalam 1 round-trip menggunakan fitur `append_to_response=credits`.

* **Endpoint:** `GET /movie/{movie_id}`
* **Path Parameters:**
  | Parameter | Tipe | Wajib? | Keterangan |
  |---|---|---|---|
  | `movie_id` | `integer` | **Ya** | ID film TMDB |

* **Query Parameters:**
  | Parameter | Tipe | Wajib? | Value | Keterangan |
  |---|---|---|---|---|
  | `append_to_response` | `string` | **Ya** | `credits` | Menyertakan data cast & crew (director) dalam respon yang sama |
  | `language` | `string` | Tidak | `en-US` | Format bahasa |

* **Sample Request:**
  ```http
  GET /movie/27205?append_to_response=credits HTTP/1.1
  Host: api.themoviedb.org/3
  Authorization: Bearer <TOKEN>
  ```

* **Sample Success Response (`200 OK`):**
  ```json
  {
    "id": 27205,
    "title": "Inception",
    "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious...",
    "poster_path": "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    "backdrop_path": "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    "release_date": "2010-07-15",
    "runtime": 148,
    "vote_average": 8.368,
    "vote_count": 36580,
    "tagline": "Your mind is the scene of the crime.",
    "genres": [
      { "id": 28, "name": "Action" },
      { "id": 878, "name": "Science Fiction" },
      { "id": 12, "name": "Adventure" }
    ],
    "credits": {
      "cast": [
        {
          "id": 6193,
          "name": "Leonardo DiCaprio",
          "character": "Dom Cobb",
          "profile_path": "/wo2Syst399onNenQI2aVCS0ulBt.jpg",
          "order": 0
        },
        {
          "id": 24045,
          "name": "Joseph Gordon-Levitt",
          "character": "Arthur",
          "profile_path": "/dhv9f3j7F9r7RsmJp9u8Fh9N0L6.jpg",
          "order": 1
        },
        {
          "id": 27578,
          "name": "Elliot Page",
          "character": "Ariadne",
          "profile_path": "/tp1556w96v0Gg09kFvP3D3p3e1s.jpg",
          "order": 2
        }
      ],
      "crew": [
        {
          "id": 525,
          "name": "Christopher Nolan",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/xuAIuYSmsUzKlUMBFGVZaWsY3Z5.jpg"
        }
      ]
    }
  }
  ```

> [!TIP]
> **Cara Mengambil Director:**
> Cari item pada array `credits.crew` di mana `job === "Director"`:
> ```ts
> const director = movie.credits?.crew.find(member => member.job === "Director")
> ```

---

## 4. URL Builder Gambar TMDB

Semua path gambar dari response TMDB bertipe relative path (contoh: `/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg`). URL gambar lengkap dibentuk dengan format:

$$\text{Image URL} = \text{Base URL} + \text{Size} + \text{Path}$$

### Pilihan Ukuran (Size) Resmi TMDB:
* **Poster (`poster_path`):**
  * `w92`, `w154`, `w185`, `w342`, `w500` (disarankan untuk card), `w780`, `original`
* **Backdrop (`backdrop_path`):**
  * `w300`, `w780`, `w1280`, `original` (disarankan untuk background detail)
* **Profile / Cast (`profile_path`):**
  * `w45`, `w185`, `h632`, `original`

### Contoh:
* Poster Card (w500): `https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg`
* Cast Profile (w200/w185): `https://image.tmdb.org/t/p/w185/wo2Syst399onNenQI2aVCS0ulBt.jpg`
* Fallback (jika path bernilai `null`): `https://placehold.co/500x750/1e293b/94a3b8?text=No+Poster`

---

## 5. Standar Penanganan Error (Error Contract)

Jika request gagal (misal: API key salah, movie tidak ditemukan, rate limit terlampaui), TMDB mengembalikan respon JSON format:

```json
{
  "status_code": 7,
  "status_message": "Invalid API key: You must be granted a valid key.",
  "success": false
}
```

### HTTP Status Codes:
* `200 OK`: Request berhasil.
* `401 Unauthorized`: API Key / Access Token tidak valid atau belum diisi.
* `404 Not Found`: ID film tidak ditemukan.
* `429 Too Many Requests`: Rate limit terlampaui.
* `500 / 503 Internal Server Error`: Layanan TMDB sedang mengalami kendala.

---

## 6. TypeScript Contract Definitions

Semua tipe data ini telah didefinisikan secara modular di [`src/types/api.types.ts`](file:///Users/mac/WORK/test-nusantech/src/types/api.types.ts) dan [`src/features/movies/types/movie.types.ts`](file:///Users/mac/WORK/test-nusantech/src/features/movies/types/movie.types.ts):

```typescript
// Shared Pagination Response
export interface PaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

// Category Types
export type MovieCategory = "now_playing" | "popular" | "top_rated" | "upcoming"

// Movie Summary (List & Search)
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

// Cast Member
export interface CastMember {
  id: number
  name: string
  original_name: string
  character: string
  profile_path: string | null
  order: number
}

// Crew Member (Director, Producer, etc)
export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

// Credits Object
export interface MovieCredits {
  cast: CastMember[]
  crew: CrewMember[]
}

// Detailed Movie Data
export interface MovieDetail extends Movie {
  genres: { id: number; name: string }[]
  runtime: number | null
  tagline: string | null
  status: string
  credits?: MovieCredits
}
```
