//src/routes/movie.routes.ts
import express from 'express';
import * as MovieController from '../controllers/movie.controller';

const router = express.Router();

const authMiddleware = (req, res, next) => {
    const authToken = req.headers.authorization;
    console.log('testing', authToken);
    if (!authToken) {
      return res.status(401).json({ error: 'Unauthorized. Token missing.' });
    }
    next();
  };

router.get('/movies', MovieController.getAllMovies);
router.get('/search', MovieController.searchMovies);
router.post('/movies', authMiddleware, MovieController.createMovie);
router.put('/movies/:id', authMiddleware, MovieController.updateMovie);
router.delete('/movies/:id', authMiddleware, MovieController.deleteMovie); 

export default router;
