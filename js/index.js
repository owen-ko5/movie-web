document.addEventListener("DOMContentLoaded", () => {
    fetchMovies(); // Load all movies on page load

    // Event listeners for category buttons
    document.getElementById("movies-btn").addEventListener("click", () => fetchCategory("movies"));
    document.getElementById("series-btn").addEventListener("click", () => fetchCategory("series"));
    document.getElementById("animation-btn").addEventListener("click", () => fetchCategory("animation"));
    document.getElementById("kdrama-btn").addEventListener("click", () => fetchCategory("k-drama"));

    document.getElementById("search-btn").addEventListener("click", searchMovies);
});

// Fetch all movies from db.json
function fetchMovies() {
    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(data => displayMovies(data))
        .catch(error => console.error("Error fetching movies:", error));
}

// Fetch specific category
function fetchCategory(category) {
    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(data => {
            const filteredMovies = data.filter(movie => movie.category.toLowerCase() === category);
            displayMovies(filteredMovies);
        })
        .catch(error => console.error(`Error fetching ${category}:`, error));
}

// Display movies dynamically
function displayMovies(movies) {
    const container = document.getElementById("movie-container");
    container.innerHTML = ""; // Clear previous content

    movies.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        movieDiv.innerHTML = `
            <div class="movie-card">
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-details">
                    <h2>${movie.title}</h2>
                    <p><strong>Genre:</strong> ${movie.genre}</p>
                    <p class="description">${movie.description}</p>
                </div>
            </div>
        `;

        container.appendChild(movieDiv);
    });
}
document.querySelectorAll(".clickable").forEach(element => {
    element.addEventListener("click", (event) => {
        const movieId = event.target.getAttribute("data-id");
        toggleDescription(movieId);
    });
});
function toggleDescription(movieId) {
    const description = document.getElementById(`desc-${movieId}`);

    if (description.style.display === "none") {
        description.style.display = "block"; // Show description
    } else {
        description.style.display = "none"; // Hide description
    }
}

function searchMovies() {
    const searchInput = document.getElementById("search-input").value.toLowerCase(); // Get search text

    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(data => {
            // Filter movies based on title match
            const filteredMovies = data.filter(movie => 
                movie.title.toLowerCase().includes(searchInput)
            );

            // Display filtered results
            displayMovies(filteredMovies);
        })
        .catch(error => console.error("Error searching movies:", error));
}

