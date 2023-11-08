//integration-test/movie.test.ts

import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';

// Replace this with your MongoDB connection URL
const MONGODB_URI = 'mongodb://localhost:27017/movie-lobby';

let movieId;

beforeAll(async () => {
  await mongoose.connect(MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Movie API Integration Tests', () => {
  it('GET /api/movies should return a list of movies', async () => {
    const response = await request(app).get('/api/movies');
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it('POST /api/movies should create a new movie', async () => {
    const newMovie = {
      title: 'New Movie',
      genre: 'Action',
      rating: 4.5,
      streamingLink: 'https://example.com/movie',
    };

    const response = await request(app).post('/api/movies').set('Authorization', 'Admin').send(newMovie);
    movieId = response.body._id;
    console.log(movieId);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newMovie);
  });

  it('PUT /api/movies/:id should update a specific movie', async () => {
    const updatedMovie = {
      title: 'Updated Movie',
      genre: 'Drama',
      rating: 4.0,
      streamingLink: 'https://example.com/updated-movie',
    };

    const response = await request(app).put(`/api/movies/${movieId}`).set('Authorization', 'Admin').send(updatedMovie);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedMovie);
  });

  it('DELETE /api/movies/:id should delete a specific movie', async () => {
   
    const response = await request(app).delete(`/api/movies/${movieId}`).set('Authorization', 'Admin');
    expect(response.status).toBe(200);
  });
});

