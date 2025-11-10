import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import volunteerRouter from "./router/volunteerRouter.js";
import resturentRouter from "./router/resturentRouter.js";
import ngoRouter from "./router/ngoRouter.js";
import deliveryRouter from "./router/deliveryRouter.js"; 

const app = express();
const PORT = process.env.PORT || 8000;
import authRouter from "./router/authRouter.js";

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,              
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/auth", authRouter);
app.use(cookieParser());         


app.get("/", (req, res) => {
  res.json({ message: "Use POST /signup with name, email, password, etc." });
});
app.use("/volunteer", volunteerRouter);
app.use("/resturent", resturentRouter);
app.use("/ngo", ngoRouter);
app.use("/delivery", deliveryRouter); 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



