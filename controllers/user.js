import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import emailValidator from '../validators/email.js';
import nameValidator from '../validators/name.js';
import passwordValidator from '../validators/password.js';
import usernameValidator from '../validators/username.js';
import User from '../models/user.js';

const createUser = async (req, res) => {
    res.json({ message: 'Create user' });
};

export { createUser };