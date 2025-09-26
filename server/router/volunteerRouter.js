import express from "express";
import { createUser, validateUser } from "../models/volunteerModel.js";
import db  from "./db.js";
import { generateToken } from "../utils/auth.js";

const router = express.Router();
router.post("/signup",async (req,res)=>{
       try{
        const {name,phn_no,email,address,password}=req.body 
          if (!name || !email || !phn_no||!address ||!password) {
            return res.status(400).json({ message: "Name, email, and phone are required" });
        }
          const user= await createUser(name,phn_no,email,address,password)
           res.status(201).json({ message: "User created successfully", user });
       }catch(err){
        console.error(err)
        res.status(500).json({ message: "Server Error", error: err.message });
       }
})
router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const isValid=await  validateUser(email,password)
    if(!isValid){
        res.status(401).json({"message":"Invalid email or password"})
        
    }
    const [rows] = await db.execute(
        "SELECT vol_id, vol_name, vol_email,vol_address, vol_phn_no FROM volunteer WHERE vol_email = ?",
        [email]
    );
    const user = rows[0];
    const token=generateToken(user.vol_id,user.vol_name,user.vol_email,user.vol_address,user.vol_phn_no)
    res.send(token)
})
export default router;
