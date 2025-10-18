import express from "express";
import { createUser, validateUser } from "../models/volunteerModel.js";
import { generateToken } from "../utils/auth.js";
import { getCoordinates } from "../utils/geocode.js";


const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, phn_no, email, address, password } = req.body;
    if (!name || !email || !phn_no || !address || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { latitude, longitude } = await getCoordinates(address);

    const user = await createUser(name, phn_no, email, address, latitude, longitude, password);
    if (!user.success) return res.status(400).json({ message: user.message });

    res.status(201).json({ message: "User created successfully", user: user.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  console.log("Login request received:", req.body);
  try {
    const { email, password } = req.body;

    const user = await validateUser(email, password);
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user.vol_id, user.vol_name, user.vol_email, user.vol_address, user.vol_phn_no);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});


export default router;
