
import express from "express";
import cors from "cors";

import volunteerRouter from "./router/volunteerRouter.js"
const app=express()

const PORT=8000
app.use(cors());
app.get("/",(req,res)=>{
    res.json({"message": "Use POST /signup with name, email, password, etc."})
})
app.use(express.json());
app.use("/signup",volunteerRouter)
app.listen(PORT,()=>console.log("server started"))


