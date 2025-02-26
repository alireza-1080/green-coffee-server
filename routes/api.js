import express from 'express';
import usersRouter from './users.js';

const apiRouter = express.Router();

apiRouter.use('/users', usersRouter);


//! Sample of setting and deleting cookies

apiRouter.post('/set-cookie', (_req, res) => {
  // Set a cookie with the name 'name' and the value 'express'
  res.cookie('name', 'express', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  });

  // Send a response to the client
  res.json('cookie set');
});

apiRouter.post('/delete-cookie', (_req, res) => {
  // Clear the cookie with the name 'name'
  res.clearCookie('name');

  // Send a response to the client
  res.json('cookie deleted');
});

export default apiRouter;
