import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import emailValidator from '../validators/email.js';
import nameValidator from '../validators/name.js';
import passwordValidator from '../validators/password.js';
import usernameValidator from '../validators/username.js';
import User from '../models/user.js';

const createUser = async (req, res) => {
  try {
    //! Get name, username, email, password, confirmPassword from req.body
    let { name, username, email, password, confirmPassword } = req.body;

    //! Validate name
    const { value: validatedName, error: nameError } =
      nameValidator.validate(name);
    if (nameError) {
      throw nameError;
    }

    //? Convert the name to title case
    name = validatedName.replace(/\b\w/g, (char) => char.toUpperCase());

    //! Validate username
    const { value: validatedUsername, error: usernameError } =
      usernameValidator.validate(username);

    if (usernameError) {
      throw usernameError;
    }

    //? Convert the username to lowercase
    username = validatedUsername;

    //! Validate email
    const { value: validatedEmail, error: emailError } =
      emailValidator.validate(email);

    if (emailError) {
      throw emailError;
    }

    email = validatedEmail;

    //! Validate password
    const { error: passwordError } = passwordValidator.validate(password);

    if (passwordError) {
      throw passwordError;
    }

    //! Check if password and confirmPassword match
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    //! Hash the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    //! Set hashed password to password
    password = hashedPassword;

    //! Check if it's the first user to register
    const users = await User.find();

    let role = 'user';

    if (users.length === 0) {
      role = 'admin';
    }

    //! Create sample user object
    const sampleUser = {
      name,
      username,
      email,
      password,
      role,
    };

    //! Create the user
    const user = await User.create(sampleUser);

    if (!user) {
      throw new Error('User could not be created');
    }

    //! Send a success response
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const customMessages = {
        email: 'Email address is already registered',
        username: 'Username is already taken',
      };
      return res.status(409).json({
        message: customMessages[field] || `${field} already exists`,
      });
    }

    return res.status(400).json({ message: error.message });
  }
};

export { createUser };
