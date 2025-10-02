import db from "./db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function createUser(name, phn_no, email, address,lattitude,longtitude, password) {

    const [existing] = await db.execute(
        "SELECT * FROM ngo WHERE ngo_email = ? OR ngo_phn_no = ?",
        [email, phn_no]
    );

    if (existing.length > 0) {
        return { success: false, message: "Email or phone number already registered" };
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await db.execute(
        "INSERT INTO ngo (ngo_name, ngo_phn_no, ngo_email, ngo_address,ngo_latitude,ngo_longitude, password) VALUES (?, ?, ?,?,?, ?, ?)",
        [name, phn_no, email, address,lattitude,longtitude, hashedPassword]
    );

    return { success: true, userId: result.insertId };
}
export async function validateUser(email, password) {
    const [rows] = await db.execute(
        "SELECT password FROM ngo WHERE ngo_email = ?",
        [email]
    );

    if (rows.length === 0) return false;

    const isValid = await bcrypt.compare(password, rows[0].password);
    return isValid;
}
