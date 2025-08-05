import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../models/db.js';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashed]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error.message);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Username already exists' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const [users] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    const user = users[0];

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
