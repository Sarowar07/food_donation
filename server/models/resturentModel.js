import db from "./db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function createUser(name, phn_no, email, address, latitude, longitude, password) {
  try {
    const [existing] = await db.execute(
      "SELECT * FROM restaurant WHERE res_email = ? OR res_phn_no = ?",
      [email, phn_no]
    );

    if (existing.length > 0) {
      return { success: false, message: "Email or phone number already registered" };
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await db.execute(
      "INSERT INTO restaurant (res_name, res_phn_no, res_email, res_address, res_latitude, res_longitude, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, phn_no, email, address, latitude, longitude, hashedPassword]
    );

    return {
      success: true,
      user: { id: result.insertId, name, email, phn_no, address, latitude, longitude }
    };
  } catch (err) {
    console.error("Error creating restaurant:", err);
    return { success: false, message: "Server error" };
  }
}

export async function validateUser(email, password) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM restaurant WHERE res_email = ?",
      [email]
    );

    if (rows.length === 0) return null;

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return null;

    const { password: _, ...userInfo } = user;
    return userInfo;
  } catch (err) {
    console.error("Error validating restaurant:", err);
    return null;
  }
}
