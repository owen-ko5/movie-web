document.addEventListener("DOMContentLoaded", fetchMovies);

function fetchMovies() {
    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(data => displayMovies(data))
        .catch(error => console.error("Error fetching movies:", error));
}

function displayMovies(movies) {
    const container = document.getElementById("movie-container");
    container.innerHTML = "";
    
    movies.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `
            <h2>${movie.title}</h2>
            <p>${movie.genre}</p>
            <img src="${movie.image}" alt="${movie.title}">
        `;
        container.appendChild(movieDiv);
    });
}

function searchMovies() {
    const searchInput = document.getElementById("search").value.toLowerCase();
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
document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
});

function fetchMovies() {
    fetch("http://localhost:3000/movies") // Fetch movies from JSON Server
        .then(response => response.json())
        .then(movies => {
            let movieContainer = document.createElement("div");
            movieContainer.classList.add("movie-list");

            movies.forEach(movie => {
                let movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");

                movieCard.innerHTML = `
                    <img src="${movie.image}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <p>Genre: ${movie.genre}</p>
                    <p>Year: ${movie.year}</p>
                `;

                movieContainer.appendChild(movieCard);
            });

            document.body.appendChild(movieContainer);
        })
        .catch(error => console.error("Error fetching movies:", error));
}
