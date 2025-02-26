import express from 'express';
import { createUser } from '../controllers/user.js';

const usersRouter = express.Router();

usersRouter.post('/create-user', createUser);

export default usersRouter;
