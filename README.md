https://kennedy218218.github.io/MY-PROJECT/

// let activeCategory = "all";
it is used to track the selected category 

 // Event listeners for category buttons
Adds click event listeners to category button
it calls to load all movies from db.json 
it runs when the page loads 

 // Update global category
 when category button is clicked the function calls to filter movies 

 //Fetch all movies from local JSON server
 it fetches all movies from json-server converts the responce to json passes the movie data to displayMovies and if there is any error it says 

 //Fetching Movies by Category
 fetches all movies filters movie that match the selected category

  //Fetching Trending Movies from TMDB
  it calls TMBD API  to get Trending Movies 

  //Display movies dynamically
  clears previous movies
  sets title,genre,year,description and image

  //search movies 
  gets the search input  value 
  if the input is empty it reloads 


  summary
Loads all movies on page load.
Filters movies by category.
Searches movies by title.
Fetches Trending Movies from TMDB API. 
Redirects to Movie Details Page on click