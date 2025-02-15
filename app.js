import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRouter from './routes/api.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.use('/api', apiRouter);

export default app;