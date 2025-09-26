import db from "./db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function createUser(name, phn_no, email, address, password) {
    const [existing] = await db.execute(
        "SELECT * FROM restaurant WHERE res_email = ? OR res_phn_no = ?",
        [email, phn_no]
    );

    if (existing.length > 0) {
        return { success: false, message: "Email or phone number already registered" };
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const [result] = await db.execute(
        "INSERT INTO restaurant (res_name, res_phn_no, res_email, res_address, password) VALUES (?, ?, ?, ?, ?)",
        [name, phn_no, email, address, hashedPassword]
    );

    return { success: true, userId: result.insertId };
}

export async function validateUser(email, password) {
    const [rows] = await db.execute(
        "SELECT password FROM restaurant WHERE res_email = ?",
        [email]
    );

    if (rows.length === 0) return false;

    const isValid = await bcrypt.compare(password, rows[0].password);
    return isValid;
}
