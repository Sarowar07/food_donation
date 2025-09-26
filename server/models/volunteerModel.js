import db  from "./db.js";
import bcrypt from "bcrypt"

const saltRounds = 10;
export async function createUser(name,phn_no,email,address,password){
   const temp= await db.execute("SELECT * FROM volunteer WHERE (vol_email = ?) OR (vol_phn_no = ?) ", [email,phn_no]);
   if(temp.length===0)return;
   const hashedPassword=await bcrypt.hash(password,saltRounds)
   const [result]=await db.execute("INSERT INTO volunteer (vol_name,vol_phn_no,vol_email,vol_address,password) VALUES (?, ?, ?,?,?)",[name,phn_no,email,address,hashedPassword]);
}
export async function validateUser(email,password){
   const [rows] = await db.execute("SELECT password FROM volunteer WHERE vol_email = ?", [email]);
   if (rows.length === 0) return false;
const isValid = await bcrypt.compare(password, rows[0].password);
return isValid
}