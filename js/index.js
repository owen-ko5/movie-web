let activeCategory = "all";
document.addEventListener("DOMContentLoaded", () => {
    fetchMovies(); 

    
    document.getElementById("movies-btn").addEventListener("click", () => fetchCategory("movies"));
    document.getElementById("series-btn").addEventListener("click", () => fetchCategory("series"));
    document.getElementById("animation-btn").addEventListener("click", () => fetchCategory("animation"));
    document.getElementById("kdrama-btn").addEventListener("click", () => fetchCategory("k-drama"));
    document.getElementById("browser-btn").addEventListener("click", fetchTrendingMovies);
    document.getElementById("search-btn").addEventListener("click", searchMovies);
});
function setCategory(category) {
    activeCategory = category; 
    fetchCategory(category);
}

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


function fetchCategory(category) {
    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(data => {
            const filteredMovies = data.filter(movie => movie.category.toLowerCase() === category);
            displayMovies(filteredMovies);
        })
        .catch(error => console.error(`Error fetching ${category}:`, error));
}


function fetchTrendingMovies() {
    const apiKey = "cfdfd510ab2d960857f9947e9d4df55c";
    const trendingUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    fetch(trendingUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayMovies(data.results, true)) 
        .catch(error => console.error("Error fetching trending movies:", error));
}


function displayMovies(movies, isTMDB = false) {
    const container = document.getElementById("movie-container");
    container.innerHTML = ""; 

    movies.forEach(movie => {
        const movieId = movie.id;
        const movieTitle = movie.title || "Unknown Title";
        const movieGenre = movie.genre || (movie.genre_ids ? movie.genre_ids.join(", ") : "N/A");
        const movieYear = movie.year || (movie.release_date ? movie.release_date.split("-")[0] : "Unknown");
        const movieDesc = movie.description || movie.overview || "No description available";
        const movieImage = isTMDB
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : movie.image || "default-image.jpg"; 

        if (!movieId || !movieTitle) {
            console.error("Invalid movie data:", movie);
            return;
        }

        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        movieDiv.innerHTML = `
            <div class="movie-card">
                <img src="${movieImage}" alt="${movieTitle}" class="clickable" data-id="${movieId}">
                <div class="movie-details">
                    <h2 class="clickable" data-id="${movieId}">${movieTitle}</h2>
                    <p><strong>Genre:</strong> ${movieGenre}</p>
                    <p><strong>Year:</strong> ${movieYear}</p> 
                    <p class="description"><strong>Description:</strong> ${movieDesc}</p>
                </div>
            </div>
        `;

       
        movieDiv.querySelectorAll(".clickable").forEach(element => {
            element.addEventListener("click", (event) => {
                const movieId = event.target.getAttribute("data-id");
                if (movieId) {
                    window.location.href = `movie.html?id=${movieId}`; // Redirect to details page
                }
            });
        });

        container.appendChild(movieDiv);
    });
}


function searchMovies() {
    const searchInput = document.getElementById("search-input").value.toLowerCase().trim();

    if (searchInput === "") {
        fetchMovies(); 
        return;
    }

    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(data => {
            const filteredMovies = data.filter(movie =>
                movie.title.toLowerCase().includes(searchInput)
            );

            if (filteredMovies.length === 0) {
                document.getElementById("movie-container").innerHTML = "<h3>No movies found</h3>";
            } else {
                displayMovies(filteredMovies);
            }
        })
        .catch(error => console.error("Error searching movies:", error));
}

