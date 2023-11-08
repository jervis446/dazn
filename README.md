# dazn
## Movie API Controller
This module provides controllers for handling movie-related operations in the Movie API. The controllers include functionality to retrieve, create, update, and delete movies.

# Controllers
## getAllMovies
Retrieves all movies from the database and sends them as a JSON response.

### Endpoint: GET /api/movies
Response:
Status Code: 200 if successful
Status Code: 500 if an internal server error occurs
JSON Array: List of movies
searchMovies
Searches for movies based on the provided query.

### Endpoint: GET /api/search?q={query}
Response:
Status Code: 200 if successful
Status Code: 400 if the query parameter "q" is missing
Status Code: 500 if an internal server error occurs
JSON Array: List of movies matching the search query
createMovie
Creates a new movie in the database.

### Endpoint: POST /api/movies
Request Body:
title: Title of the movie
genre: Genre of the movie
rating: Rating of the movie
streamingLink: Link to stream the movie
Response:
Status Code: 201 if the movie is created successfully
Status Code: 500 if an internal server error occurs
JSON Object: The created movie
updateMovie
Updates a movie in the database.

### Endpoint: PUT /api/movies/:id
Request Parameters:
id: ID of the movie to update
Request Body:
title: Updated title of the movie
genre: Updated genre of the movie
rating: Updated rating of the movie
streamingLink: Updated link to stream the movie
Response:
Status Code: 200 if the movie is updated successfully
Status Code: 404 if the movie is not found
Status Code: 500 if an internal server error occurs
JSON Object: The updated movie
deleteMovie
Deletes a movie from the database.

### Endpoint: DELETE /api/movies/:id
Request Parameters:
id: ID of the movie to delete
Response:
Status Code: 200 if the movie is deleted successfully
Status Code: 404 if the movie is not found
Status Code: 500 if an internal server error occurs
JSON Object: The deleted movie (if successful)
Caching
The controllers utilize an in-memory cache to optimize repeated requests. Cached data is used when available to reduce database queries and enhance response times.

### Please note that this README assumes the Movie API is part of a larger application and provides only a brief overview of the controllers. Refer to the corresponding API documentation for detailed information on each endpoint.
