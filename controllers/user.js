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

const loginUser = async (req, res) => {
  try {
    //! Get identifier, password and rememberMe from req.body
    let { identifier, password, rememberMe } = req.body;

    console.log(identifier)

    //! Make sure identifier is all lowercase
    identifier = identifier.toLowerCase();

    //! Check if identifier is a valid email
    const { value: validatedEmail, error: emailError } =
      emailValidator.validate(identifier);

    //! Check if identifier is a valid username
    const { value: validatedUsername, error: usernameError } =
      usernameValidator.validate(identifier);

    if (emailError && usernameError) {
      throw new Error('Invalid email or username');
    }

    //! Check if password is a valid password
    const { error: passwordError } = passwordValidator.validate(password);

    if (passwordError) {
      throw passwordError;
    }

    //! Check if there is a user with the email or username
    const user = await User.findOne({
      $or: [{ email: validatedEmail }, { username: validatedUsername }],
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    //! Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    //! Generate a token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: rememberMe ? '30d' : '1d',
    });

    //! Set token in cookie
    res.cookie('green-coffee-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
    });

    //! Send a success response
    return res.status(200).json({ message: 'Login successful' });


  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const isUserLoggedIn = async (req, res) => {
  try {
    //! Get green-coffee-token from authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('Not authorized');
    }

    //! Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //! Check if user exists
    const user = await User.findById(decoded.user.id)

    if (!user) {
      throw new Error('User not found');
    }

    //! Send a success response
    return res.status(200).json({ message: 'User is logged in' });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export { createUser, loginUser, isUserLoggedIn };
