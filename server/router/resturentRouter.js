import express from "express";
import { createUser, validateUser } from "../models/resturentModel.js";
import { generateToken } from "../utils/auth.js";
import { createDelivery } from "../models/deliveryModel.js";
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
  try {
    const { email, password } = req.body;

    const user = await validateUser(email, password);
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user.res_id, user.res_name, user.res_email, user.res_address, user.res_phn_no);

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

router.post("/create", async (req, res) => {
  try {
    const { res_id, food_amount } = req.body;
    if (!res_id || !food_amount) return res.status(400).json({ message: "res_id and food_amount required" });

    const [rows] = await db.execute(
      "SELECT res_name, res_address, res_latitude, res_longitude FROM restaurant WHERE res_id = ?",
      [res_id]
    );

    if (rows.length === 0) return res.status(404).json({ message: "Restaurant not found" });

    const { res_name, res_address, res_latitude, res_longitude } = rows[0];
    await createDelivery(res_id, res_name, food_amount, res_address, res_latitude, res_longitude);

    res.status(201).json({ message: "Delivery created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;
