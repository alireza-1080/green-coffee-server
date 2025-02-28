import express from 'express';
import { createUser, loginUser } from '../controllers/user.js';

const usersRouter = express.Router();

usersRouter.post('/create-user', createUser);

usersRouter.post('/login', loginUser);

export default usersRouter;
