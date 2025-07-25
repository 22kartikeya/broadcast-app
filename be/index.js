import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { userRouter } from './routes/user.js';
import { broadcastRouter } from './routes/broadcast.js';

dotenv.config();
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/site', userRouter);
app.use('/send', broadcastRouter);
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB is connnected!")
        app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`);
        })
    } catch (e) {
        console.log("Failed to connect MongoDB: ", e);
        process.exit(1);
    }
}

startServer();