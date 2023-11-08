// test-api.ts

import fetch from 'node-fetch';

const baseUrl = 'http://localhost:3000/api'; // Update with your actual server address

async function testAllEndpoints() {
  // Test GET /movies
  await testGetMovies();

  // Test GET /search
  await testSearchMovies();

  // Test POST /movies
  await testCreateMovie();

  // Test PUT /movies/:id
  await testUpdateMovie();

  // Test DELETE /movies/:id
  await testDeleteMovie();
}

async function testGetMovies() {
  console.log('Testing GET /movies');
  try {
    const response = await fetch(`${baseUrl}/movies`);
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function testSearchMovies() {
  console.log('Testing GET /search?q=Action');
  try {
    const response = await fetch(`${baseUrl}/search?q=Action`);
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function testCreateMovie() {
  console.log('Testing POST /movies');
  const movieData = {
    title: 'Test Movie',
    genre: 'Test Genre',
    rating: 3.5,
    streamingLink: 'https://test-example.com',
  };

  try {
    const response = await fetch(`${baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    });
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function testUpdateMovie() {
  console.log('Testing PUT /movies/:id');
  const updatedMovieData = {
    title: 'Updated Test Movie',
    genre: 'Updated Test Genre',
    rating: 4.2,
    streamingLink: 'https://updated-test-example.com',
  };

  // Replace 'your_movie_id' with an actual movie ID
  const movieIdToUpdate = '654a838297863c1d6349fecb';

  try {
    const response = await fetch(`${baseUrl}/movies/${movieIdToUpdate}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovieData),
    });
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function testDeleteMovie() {
  console.log('Testing DELETE /movies/:id');
  
  // Replace 'your_movie_id' with an actual movie ID
  const movieIdToDelete = '654a838297863c1d6349fecb';

  try {
    const response = await fetch(`${baseUrl}/movies/${movieIdToDelete}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run all tests
testAllEndpoints();
