// utils/jwtUtils.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

export const verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);
