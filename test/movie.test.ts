import { Request, Response } from 'express';
import * as movieController from '../src/controllers/movie.controller';
import MovieModel from '../src/models/movie.model';

const mockMovieController = movieController as any & {
    movieCache: Record<string, any[]>;
    movieModel: { find: jest.Mock };
  };
  

jest.mock('../src/models/movie.model');

describe('getAllMovies', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  it('should return cached data if available', async () => {
    mockMovieController.movieCache = { getAllMovies: [{
        title: 'Test Movie',
        genre: 'Test Genre',
        rating: 3.5,
        streamingLink: 'https://test-example.com',
      }] };

    await mockMovieController.getAllMovies(req, res);

    expect(res.json).toHaveBeenCalledWith([{
    title: 'Test Movie',
    genre: 'Test Genre',
    rating: 3.5,
    streamingLink: 'https://test-example.com',
  }]);
  });

  it('should fetch data from the database if not in cache', async () => {
    mockMovieController.movieCache = { getAllMovies: [] };
    const moviesFromDatabase = [{
        title: 'Test Movie 2',
        genre: 'Test Genre',
        rating: 3.5,
        streamingLink: 'https://test-example.com',
      }];
    (MovieModel.find as jest.Mock).mockResolvedValueOnce(moviesFromDatabase);

    await mockMovieController.getAllMovies(req, res);

    expect(res.json).toHaveBeenCalledWith(moviesFromDatabase);
    expect(mockMovieController.movieCache.getAllMovies).toEqual(moviesFromDatabase);
  });

  it('should handle errors', async () => {
    mockMovieController.movieCache = { getAllMovies: [] };
    (MovieModel.find as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    await mockMovieController.getAllMovies(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('searchMovies', () => {
    let req: Request;
    let res: Response;
  
    beforeEach(() => {
      req = { query: { q: 'searchQuery' } } as unknown as Request;
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;
      mockMovieController.movieCache.searchMovies = [];
    });
  
    it('should return cached data if available', async () => {
        mockMovieController.movieCache.searchMovies = [{ title: 'Cached Movie' }];
  
      await mockMovieController.searchMovies(req, res);
  
      expect(res.json).toHaveBeenCalledWith([{ title: 'Cached Movie' }]);
    });
  
    it('should fetch data from the database if not in cache', async () => {
      const moviesFromDatabase = [{ title: 'Movie 1' }, { title: 'Movie 2' }];
      (MovieModel.find as jest.Mock).mockResolvedValueOnce(moviesFromDatabase);
  
      await mockMovieController.searchMovies(req, res);
  
      expect(res.json).toHaveBeenCalledWith(moviesFromDatabase);
      expect(mockMovieController.movieCache.searchMovies).toEqual(moviesFromDatabase);
    });
  
    it('should handle errors gracefully', async () => {
      (MovieModel.find as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
  
      await mockMovieController.searchMovies(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  
    it('should handle missing query parameter', async () => {
      req.query.q = undefined;
  
      await mockMovieController.searchMovies(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Query parameter "q" is required' });
    });
});

describe('createMovie', () => {
    let req: Request;
    let res: Response;
  
    beforeEach(() => {
      req = {
        body: {
          title: 'Test Movie',
          genre: 'Test Genre',
          rating: 5,
          streamingLink: 'http://testlink.com',
        },
      } as unknown as Request;
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;
      mockMovieController.movieCache.getAllMovies = [];
    });
  
    it('should create a new movie', async () => {
      const newMovie = { ...req.body, _id: 'testId' };
      (MovieModel.prototype.save as jest.Mock).mockResolvedValueOnce(newMovie);
  
      await mockMovieController.createMovie(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newMovie);
    });
  
    it('should handle errors during movie creation', async () => {
      const errorMessage = 'Database error';
      (MovieModel.prototype.save as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
  
      await mockMovieController.createMovie(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
  