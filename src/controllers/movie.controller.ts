//src/controllers/movie.controller.ts
import { Request, Response } from 'express';
import MovieModel, { Movie } from '../models/movie.model';

export const movieCache: Record<string, Movie[]> = {
    getAllMovies: [],
    searchMovies: [],
  };

/**
 * Retrieves all movies from the database and sends them as a JSON response.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} - Returns a Promise that resolves when the response is sent.
 */
export const getAllMovies = async (req: Request, res: Response) => {
    if (movieCache.getAllMovies.length > 0) {
        console.log('Fetching movies from cache');
        return res.json(movieCache.getAllMovies);
    }

  try {
    const movies = await MovieModel.find();
    movieCache.getAllMovies = movies;
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Searches for movies based on the provided query.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} - A promise that resolves to void.
 */
export const searchMovies = async (req: Request, res: Response) => {
  const query = req.query.q;
  console.log('testing', req.headers);

  if (!query) {
    res.status(400).json({ error: 'Query parameter "q" is required' });
    return;
  }

   if (movieCache.searchMovies.length > 0) {
    console.log(`Fetching search results for '${query}' from cache`);
    return res.json(movieCache.searchMovies);
  }

  try {
    const movies = await MovieModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } },
      ],
    });
    
    movieCache.searchMovies = movies;
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Creates a new movie in the database.
 *
 * @param {Request} req - The request object containing the movie details.
 * @param {Response} res - The response object to send the result.
 * @return {Promise<void>} - A promise that resolves when the movie is created successfully.
 */
export const createMovie = async (req: Request, res: Response) => {
    const { title, genre, rating, streamingLink } = req.body;
  
    try {
      const newMovie = new MovieModel({
        title,
        genre,
        rating,
        streamingLink,
      });
  
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

/**
 * Updates a movie in the database.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The updated movie.
 */
  export const updateMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, genre, rating, streamingLink } = req.body;
  
    try {
      const updatedMovie = await MovieModel.findByIdAndUpdate(
        id,
        { title, genre, rating, streamingLink },
        { new: true }
      );
  
      if (!updatedMovie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      res.json(updatedMovie);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
/**
 * Deletes a movie from the database.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The deleted movie.
 */
  export const deleteMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const deletedMovie = await MovieModel.findByIdAndDelete(id);
      if (!deletedMovie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      res.json(deletedMovie);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
