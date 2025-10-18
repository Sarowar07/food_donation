import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
  createDelivery,
  acceptDelivery,
  confirmDelivery,
  completeDelivery,
  getHistory
} from "../models/deliveryModel.js";


const router = express.Router();

router.post("/create", authenticateToken, async (req, res) => {
  try {
    const { food_amount, del_pickup, del_pickup_latitude, del_pickup_longitude } = req.body;
    if (!food_amount || !del_pickup || !del_pickup_latitude || !del_pickup_longitude) {
      return res.status(400).json({ message: "All delivery fields are required" });
    }

    const res_id = req.user.id;
    const res_name = req.user.name;

    const result = await createDelivery(res_id, res_name, food_amount, del_pickup, del_pickup_latitude, del_pickup_longitude);

    if (!result.success) return res.status(500).json({ message: result.message });

    res.status(201).json({ message: "Delivery created successfully", deliveryId: result.deliveryId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.post("/accept", authenticateToken, async (req, res) => {
  try {
    const { del_id, del_drop, del_drop_latitude, del_drop_longitude } = req.body;
    if (!del_id || !del_drop || !del_drop_latitude || !del_drop_longitude) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ngo_id = req.user.id;

    const result = await acceptDelivery(del_drop, ngo_id, del_id, del_drop_latitude, del_drop_longitude);
    if (!result.success) return res.status(500).json({ message: result.message });

    res.json({ message: "Delivery accepted by NGO" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.post("/confirm", authenticateToken, async (req, res) => {
  try {
    const { del_id } = req.body;
    if (!del_id) return res.status(400).json({ message: "Delivery ID required" });

    const vol_id = req.user.id;

    const result = await confirmDelivery(vol_id, del_id);
    if (!result.success) return res.status(500).json({ message: result.message });

    res.json({ message: "Delivery confirmed by volunteer" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});


router.post("/complete", authenticateToken, async (req, res) => {
  try {
    const { del_id } = req.body;
    if (!del_id) return res.status(400).json({ message: "Delivery ID required" });

    const result = await completeDelivery(del_id);
    if (!result.success) return res.status(500).json({ message: result.message });

    res.json({ message: "Delivery completed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.get("/:role/history/:id",async(req,res)=>{
     const id = Number(req.params.id);
    console.log("Received ID:", id);
     const history=await getHistory(id)
     res.json(history)

})
export default router;
