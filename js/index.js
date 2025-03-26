document.addEventListener("DOMContentLoaded", () => {
    fetchMovies(); // Load all movies on page load

    // Event listeners for category buttons
    document.getElementById("movies-btn").addEventListener("click", () => fetchCategory("movies"));
    document.getElementById("series-btn").addEventListener("click", () => fetchCategory("series"));
    document.getElementById("animation-btn").addEventListener("click", () => fetchCategory("animation"));
    document.getElementById("kdrama-btn").addEventListener("click", () => fetchCategory("k-drama"));

    document.getElementById("search-btn").addEventListener("click", searchMovies);
});

// ✅ Fetch all movies from the API
function fetchMovies() {
    fetch("http://localhost:3000/movies")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayMovies(data))
        .catch(error => console.error("Error fetching movies:", error));
}

// ✅ Fetch specific category
function fetchCategory(category) {
    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(data => {
            const filteredMovies = data.filter(movie => movie.category.toLowerCase() === category);
            displayMovies(filteredMovies);
        })
        .catch(error => console.error(`Error fetching ${category}:`, error));
}

// ✅ Display movies dynamically
function displayMovies(movies) {
    const container = document.getElementById("movie-container");
    container.innerHTML = ""; // Clear previous content

    movies.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        movieDiv.innerHTML = `
            <div class="movie-card">
                <img src="${movie.image}" alt="${movie.title}" class="clickable" data-id="${movie.id}">
                <div class="movie-details">
                    <h2 class="clickable" data-id="${movie.id}">${movie.title}</h2>
                    <p><strong>Genre:</strong> ${movie.genre}</p>
                    <p><strong>Year:</strong> ${movie.year}</p> 
                    <p class="description"><strong>Description:</strong> ${movie.description}</p>
                </div>
            </div>
        `;

        // Add event listener to image and title for redirection
        movieDiv.querySelectorAll(".clickable").forEach(element => {
            element.addEventListener("click", (event) => {
                const movieId = event.target.getAttribute("data-id");
                window.location.href = `movie.html?id=${movieId}`; // Redirect to details page
            });
        });

        container.appendChild(movieDiv);
    });
}

// ✅ Search movies using URL parameters
function searchMovies() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    
    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(data => {
            const filteredMovies = data.filter(movie => 
                movie.title.toLowerCase().includes(searchInput)
            );

            displayMovies(filteredMovies);
        })
        .catch(error => console.error("Error searching movies:", error));
}
