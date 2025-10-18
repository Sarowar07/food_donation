import db from "./db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function createUser(name, phn_no, email, address, latitude, longitude, password) {
  try {
    const [existing] = await db.execute(
      "SELECT * FROM volunteer WHERE vol_email = ? OR vol_phn_no = ?",
      [email, phn_no]
    );

    if (existing.length > 0) {
      return { success: false, message: "Email or phone number already registered" };
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await db.execute(
      "INSERT INTO volunteer (vol_name, vol_phn_no, vol_email, vol_address, vol_latitude, vol_longitude, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, phn_no, email, address, latitude, longitude, hashedPassword]
    );

    return {
      success: true,
      user: { id: result.insertId, name, phn_no, email, address, latitude, longitude }
    };
  } catch (err) {
    console.error("Error creating volunteer:", err);
    return { success: false, message: "Server error" };
  }
}
export async function validateUser(email, password) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM volunteer WHERE vol_email = ?",
      [email]
    );

    console.log("Rows found:", rows.length);
    if (rows.length === 0) return null;

    const user = rows[0];
    console.log("User from DB:", user);

    const isValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isValid);

    if (!isValid) return null;

    const { password: _, ...userInfo } = user;
    return userInfo;
  } catch (err) {
    console.error("Error validating volunteer:", err);
    return null;
  }
}
