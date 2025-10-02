import db from "./db.js";

export  async function createDelivery(res_id,res_name,food_amount,del_pickup,del_pickup_latitude,del_pickup_longitude){
    const delivery=await db.execute("INSERT INTO deliveries(res_id,res_name,food_amount,del_pickup,del_pickup_latitude,del_pickup_longitude)VALUES(?,?,?,?,?,?)",[res_id,res_name,food_amount,del_pickup,del_pickup_latitude,del_pickup_longitude])
    return res.json({success:true,messege:"Delivery is created sucessfully"})
}

export  async function acceptDelivery(del_drop,ngo_id,del_id,del_drop_latitude,del_drop_longitude){
    await db.execute("UPDATE deliveries SET status = 'ngo_accepted',del_drop=?,ngo_id=?,del_drop_longitude=?,del_drop_longitude=? WHERE del_id=?",[del_drop,ngo_id,del_id,del_drop_latitude,del_drop_longitude])
     return res.json({ success: true, message: "NGO accepted the delivery" });
}
export  async function confirmDelivery(vol_id,del_id){
    await db.execute("UPDATE deliveries SET status = 'vol_confirmed',vol_id=? WHERE del_id=?",[vol_id,del_id])
     return res.json({ success: true, message: "Volunteer confirmed delivery " });
}
export  async function completeDelivery(del_id){
    await db.execute("UPDATE deliveries SET status = 'completed' WHERE del_id=?",[del_id])
     return res.json({ success: true, message: "Delivery completed" });
}