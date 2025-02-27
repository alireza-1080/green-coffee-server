import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRouter from './routes/api.js';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.json('Server is up and running');
});

app.use('/api', apiRouter);




app.use(errorHandler);

export default app;