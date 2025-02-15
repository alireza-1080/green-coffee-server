import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/set-cookie', (_req, res) => {
  res.cookie('name', 'express').json('cookie set');
});

apiRouter.get('/delete-cookie', (_req, res) => {
  res.clearCookie('name').json('cookie deleted');
});

export default apiRouter;
