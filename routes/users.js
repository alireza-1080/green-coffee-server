import express from 'express';
import { createUser, loginUser, isUserLoggedIn, logoutUser } from '../controllers/user.js';

const usersRouter = express.Router();

usersRouter.post('/create-user', createUser);

usersRouter.post('/login', loginUser);

usersRouter.post('/is-user-logged-in', isUserLoggedIn);

usersRouter.post('/logout', logoutUser);

export default usersRouter;
