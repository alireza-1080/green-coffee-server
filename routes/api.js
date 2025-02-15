import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/set-cookie', (req, res) => {
  res.cookie('name', 'express').send('cookie set');
});

apiRouter.get('/delete-cookie', (req, res) => {
  res.clearCookie('name').send('cookie deleted');
});

export default apiRouter;
