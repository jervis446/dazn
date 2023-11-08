//src/server.ts
import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose
  .connect('mongodb://localhost:27017/movie-lobby')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

export default server;
