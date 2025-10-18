import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

export function generateToken(id, name, email, address, phn_no) {
  const payload = { id, name, email, address, phn_no };
  const token = jwt.sign(payload, secret, { expiresIn: "7d" }); 
  return token;
}

export function validateToken(token) {
  try {
    const verified = jwt.verify(token, secret);
    return verified;
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
}
