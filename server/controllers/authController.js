import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // HASH Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to Db
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username' });
    }

    // Check if user password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate cookie token and send to the user
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    res.cookie('token', token, {
      httpOnly: true,
      // secure: true,
      maxAge: age,
    }).status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to login' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logout successful' });
};
