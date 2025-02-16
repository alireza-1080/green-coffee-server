import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRouter from './routes/api.js';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get('/', (_req, res) => {
//   res.json('Server is up and running');
// });

app.use('/api', apiRouter);

export default app;