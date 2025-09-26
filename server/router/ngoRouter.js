import express from "express";
import { createUser, validateUser } from "../models/ngoModel.js";
import db from "../db.js";
import { generateToken } from "../utils/auth.js";

const router = express.Router();
router.post("/signup", async (req, res) => {
    try {
        const { name, phn_no, email, address, password } = req.body;
        if (!name || !email || !phn_no || !address || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await createUser(name, phn_no, email, address, password);
        if (!user.success) return res.status(400).json({ message: user.message });

        res.status(201).json({ message: "User created successfully", userId: user.userId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const isValid = await validateUser(email, password);
        if (!isValid) return res.status(401).json({ message: "Invalid email or password" });

        const [rows] = await db.execute(
            "SELECT ngo_id, ngo_name, ngo_email, ngo_address, ngo_phn_no FROM ngo WHERE ngo_email = ?",
            [email]
        );

        const user = rows[0];
        const token = generateToken(user.ngo_id, user.ngo_name, user.ngo_email, user.ngo_address, user.ngo_phn_no);

        res.json({ message: "Login successful", token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

export default router;
