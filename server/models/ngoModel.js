import db from "./db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function createUser(name, phn_no, email, address, latitude, longitude, password) {
  try {
    const [existing] = await db.execute(
      "SELECT * FROM ngo WHERE ngo_email = ? OR ngo_phn_no = ?",
      [email, phn_no]
    );

    if (existing.length > 0) {
      return { success: false, message: "Email or phone number already registered" };
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await db.execute(
      "INSERT INTO ngo (ngo_name, ngo_phn_no, ngo_email, ngo_address, ngo_latitude, ngo_longitude, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, phn_no, email, address, latitude, longitude, hashedPassword]
    );

    return {
      success: true,
      user: {
        id: result.insertId,
        name,
        email,
        phn_no
      }
    };
  } catch (err) {
    console.error("Error creating NGO:", err);
    return { success: false, message: "Server error" };
  }
}

export async function validateUser(email, password) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM ngo WHERE ngo_email = ?",
      [email]
    );

    if (rows.length === 0) return null;

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return null;
    const { password: _, ...userInfo } = user;
    return userInfo;
  } catch (err) {
    console.error("Error validating NGO:", err);
    return null;
  }
}
