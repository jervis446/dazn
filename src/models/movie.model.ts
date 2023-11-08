//src/models/movie.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Movie extends Document {
    title: string;
    genre: string;
    rating: number;
    streamingLink: string;
}

const movieSchema = new Schema({
    title: { type: String, required: true},
    genre: {type: String, required: true},
    rating: { type: Number, required: true, default: 0 },
    streamingLink: {type: String, required: true},
})

export default mongoose.model<Movie>('Movie', movieSchema);