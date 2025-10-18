import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export function authenticateToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Token not found" });

    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error("JWT auth failed:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
