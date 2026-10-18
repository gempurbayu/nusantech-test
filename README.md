# CineFlix - TMDB Movie Web Application

Aplikasi web modern berbasis **React.js** dan **TypeScript** untuk katalog film menggunakan **TMDB (The Movie Database) API**. Dibangun dengan arsitektur **Feature-Based**, performa tinggi menggunakan **Vite**, styling responsif menggunakan **Tailwind CSS + Shadcn UI**, dan pengelolaan data asinkron menggunakan **TanStack Query (React Query)** serta **Axios**.

---

## 📋 Daftar Isi
* [Fitur & Requirements](#-fitur--requirements)
* [Tech Stack](#-tech-stack)
* [Arsitektur Feature-Based](#-arsitektur-feature-based)
* [API Contract](#-api-contract)
* [Memulai (Getting Started)](#-memulai-getting-started)
* [Menjalankan Unit Test](#-menjalankan-unit-test)
* [Available Scripts](#-available-scripts)

---

## 🎯 Fitur & Requirements

Proyek ini dirancang untuk memenuhi seluruh spesifikasi dari [TECHNICAL_TEST.md](./TECHNICAL_TEST.md):

* [x] **Display Movie List:**
  * Mengambil data film dari TMDB API.
  * Menampilkan katalog dalam bentuk kartu (Poster, Judul, Tahun Rilis, Rating).
  * Setiap kartu memiliki tautan langsung ke halaman detail film.
* [x] **Movie Search:**
  * Fitur pencarian interaktif berdasarkan judul film.
  * Debounce input handling (400ms) untuk mencegah spam request API.
  * State hasil pencarian terisolasi dengan tombol clear search.
* [x] **Filtering by Category:**
  * **Now Playing** (`/movie/now_playing`)
  * **Popular** (`/movie/popular`)
  * **Top Rated** (`/movie/top_rated`)
  * **Upcoming** (`/movie/upcoming`)
* [x] **Movie Detail Page:**
  * Tampilan poster, backdrop visual dengan gradient overlay.
  * Menampilkan **Sinopsis**, **Sutradara (Director)**, dan **Pemeran Utama (Main Cast)**.
  * Tombol **"Back"** untuk kembali ke halaman daftar film.
* [x] **Pagination & Infinite Scroll:**
  * Infinite scroll otomatis saat pengguna menggulir ke bagian bawah halaman.
  * Tombol fallback *"Load More"* dengan loading spinner.
* [x] **Testing (React Testing Library + Vitest):**
  * Pengujian komponen, navigasi, dan integrasi data mock.
* [x] **Bonus Points Implemented:**
  * Menggunakan **Tailwind CSS** untuk antarmuka pengguna responsif dan modern.
  * Menggunakan **TypeScript** untuk keamanan tipe data (type-safety) yang ketat.

---

## 🛠️ Tech Stack

| Layer | Teknologi | Alasan Pemilihan |
|---|---|---|
| **Framework & Bundler** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) | Rendering cepat, DX instan dengan Hot Module Replacement (HMR). |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safety penuh pada payload API dan props komponen. *(Bonus point)* |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/) | Styling modular, utility-first, dan desain accessible modern. *(Bonus point)* |
| **Routing** | [React Router v6](https://reactrouter.com/) | Client-side routing dengan `createBrowserRouter` dan dynamic routes (`/movie/:id`). |
| **Server State & Cache** | [TanStack Query v5](https://tanstack.com/query/latest) | Caching otomatis, background revalidation, dan infinite queries. |
| **HTTP Client** | [Axios](https://axios-http.com/) | Instance terpusat dengan interceptors dan penanganan error terstandarisasi. |
| **Testing** | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) | Unit testing cepat dan kompatibel dengan lingkungan Vite + jsdom. |
| **Package Manager** | [Bun](https://bun.sh/) / npm | Instalasi dependencies ultra-cepat. |

---

## 📁 Arsitektur Feature-Based

Struktur kode diatur dengan pola **Feature-Based Architecture**, memisahkan domain fitur (`movies`, `search`) dari komponen bersama (*shared components*):

```text
src/
├── app/                        # Application shell, routing & providers
│   ├── App.tsx                 # Main layout (Navbar, Outlet, Footer)
│   ├── providers.tsx           # QueryClientProvider & context providers
│   └── router.tsx              # React Router browser routes definition
│
├── components/                 # Shared / Global UI Components
│   ├── ui/                     # Shadcn UI primitives (Button, Card, Input, Badge, Skeleton)
│   └── common/                 # Common components (Navbar, Footer, ErrorState, EmptyState, LoadingSpinner)
│
├── features/                   # Feature Modules (Domain-driven)
│   ├── movies/                 # Fitur Katalog Film & Detail
│   │   ├── api/                # TMDB API calls (movieApi.ts)
│   │   ├── components/         # Feature UI (MovieCard, MovieGrid, CategoryTabs)
│   │   ├── sections/           # Layout sections (MovieListSection, MovieDetailHeaderSection, MovieCastSection)
│   │   ├── hooks/              # Custom query hooks (useMovies, useMovieDetail)
│   │   ├── types/              # Movie domain types (Movie, MovieDetail, Credits, Cast, Crew)
│   │   └── index.ts            # Public barrel export
│   │
│   └── search/                 # Fitur Pencarian Film
│       ├── api/                # Search API service (searchApi.ts)
│       ├── components/         # SearchBar component
│       ├── sections/           # SearchResultsSection
│       ├── hooks/              # Custom query hooks (useMovieSearch)
│       ├── types/              # Search parameters & types
│       └── index.ts            # Public barrel export
│
├── hooks/                      # Shared utility hooks (useDebounce, useInfiniteScroll)
├── lib/                        # Client instances & config (axios, queryClient, utils/cn)
├── pages/                      # Page views (HomePage, MovieDetailPage, NotFoundPage)
├── types/                      # Shared types (PaginatedResponse, ApiError)
├── utils/                      # Helper functions (tmdb image builder, formatDate)
├── test/                       # Test setup & custom render utils (setup.ts, test-utils.tsx)
├── index.css                   # Global styles & Tailwind theme definitions
└── main.tsx                    # React DOM root entry point
```

---

## 📄 API Contract

Seluruh dokumentasi detail mengenai endpoint, parameter, format respon JSON, URL builder gambar, dan penanganan error dari TMDB API dapat dilihat di:

👉 **[Lihat Dokumentasi API Contract Lengkap (API_CONTRACT.md)](./API_CONTRACT.md)**

---

## 🚀 Memulai (Getting Started)

### 1. Prasyarat
* [Node.js](https://nodejs.org/) (v18+) atau [Bun](https://bun.sh/) (v1.0+)
* TMDB API Key atau Read Access Token ([Daftar di themoviedb.org](https://www.themoviedb.org/signup))

### 2. Kloning & Instalasi Dependencies
```bash
# Clone repository
git clone <repository-url>
cd test-nusantech

# Instalasi dependencies menggunakan Bun
bun install

# Atau menggunakan npm
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

Buka file `.env` dan masukkan API Key atau Read Access Token Anda:
```env
VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# Masukkan salah satu:
VITE_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token_here
# ATAU
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### 4. Jalankan Development Server
```bash
# Menggunakan Bun
bun run dev

# Atau menggunakan npm
npm run dev
```
Aplikasi akan terbuka di `http://localhost:5173`.

---

## 🧪 Menjalankan Unit Test

Proyek ini telah dikonfigurasi dengan **Vitest** dan **React Testing Library**:

```bash
# Menjalankan semua pengujian sekali jalan (CI mode)
npm test
# atau
bun run test

# Menjalankan pengujian dalam watch mode
npm run test:watch
# atau
bun run test:watch
```

---

## 📜 Available Scripts

| Script | Deskripsi |
|---|---|
| `dev` | Menjalankan Vite development server |
| `build` | Menjalankan typecheck (`tsc -b`) dan build bundle produksi ke folder `dist` |
| `preview` | Menjalankan preview lokal dari hasil build produksi |
| `test` | Menjalankan unit test dengan Vitest |
| `test:watch` | Menjalankan unit test dalam mode observasi interaktif |

---

## 👤 Author
* **Author:** Gempur Bayu
* **Email:** aji123zz@gmail.com
