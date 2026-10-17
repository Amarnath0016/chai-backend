import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.use(express.json({ limit: '50mb' })); 

app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static('public'));

app.use(cookieParser());

// routes import

import userRoutes from './routes/user.routes.js';

app.use('/api/users', userRoutes);

// http://localhost:8001/api/users/register



export default app;