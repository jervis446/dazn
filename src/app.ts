//src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import movieRoutes from './routes/movie.routes';


// creating an express app
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', movieRoutes);

export default app;
