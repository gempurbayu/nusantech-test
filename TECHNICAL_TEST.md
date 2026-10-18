# Web Application Technical Test

Your task is to create a web application using **React.js** that displays a list of movies fetched from the **TMDB API**. The application should meet the following requirements:

---

## Requirements

### 1. Display Movie List
* Fetch movie data from the **TMDB API**.
* Display the list of movies in the form of cards with key information such as:
  * Title
  * Release year
  * Poster
* Each movie card should have a link/detail that directs to the movie detail page.

### 2. Movie Search
* Provide a search feature for users to search for movies based on the title.
* When a user performs a search, display a list of movies that match the given search query.

### 3. Filtering by Category
Filter the movie list by the following categories:
* **a.** Now Playing
* **b.** Popular
* **c.** Top Rated
* **d.** Upcoming

### 4. Movie Detail Page
* When a user clicks on a movie card or a detail link, redirect them to the movie detail page.
* Display detailed information about the movie, such as:
  * Synopsis
  * Main cast
  * Director
  * Poster
* Include a **"Back"** button that directs users back to the movie list.

### 5. Pagination
* When a user scrolls to the bottom of the page, the user can see the next list of movies (you can use pagination, load more, or infinite scroll to implement that).

---

## Another Requirements
* Test your application using **React Testing Library**.

---

## Bonus
* Additional points if you use:
  * **Tailwind CSS** for styling
  * **TypeScript** for the programming language

---

## Notes
* You can use third-party libraries like `axios` to fetch data from the TMDB API.
* You have the freedom to determine the UI design according to your preference.
* You may use testing libraries such as `Jest` and `React Testing Library` for unit testing.
* Make sure to consider best practices in React.js development, such as:
  * Breaking down components into smaller ones
  * Using state and props effectively
  * Handling errors gracefully
* Additionally, be sure to implement unit testing to ensure the reliability and stability of the application.

---

*Good luck with your project!*
