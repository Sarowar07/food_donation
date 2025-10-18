import db from "./db.js";


export async function createDelivery(res_id, res_name, food_amount, del_pickup, del_pickup_latitude, del_pickup_longitude) {
  try {
    const [result] = await db.execute(
      "INSERT INTO deliveries(res_id, res_name, food_amount, del_pickup, del_pickup_latitude, del_pickup_longitude) VALUES (?, ?, ?, ?, ?, ?)",
      [res_id, res_name, food_amount, del_pickup, del_pickup_latitude, del_pickup_longitude]
    );
    return { success: true, deliveryId: result.insertId };
  } catch (err) {
    console.error("Error creating delivery:", err);
    return { success: false, message: "Server error" };
  }
}

export async function acceptDelivery(del_drop, ngo_id, del_id, del_drop_latitude, del_drop_longitude) {
  try {
    await db.execute(
      "UPDATE deliveries SET status = 'ngo_accepted', del_drop = ?, ngo_id = ?, del_drop_latitude = ?, del_drop_longitude = ? WHERE del_id = ?",
      [del_drop, ngo_id, del_drop_latitude, del_drop_longitude, del_id]
    );
    return { success: true };
  } catch (err) {
    console.error("Error accepting delivery:", err);
    return { success: false, message: "Server error" };
  }
}

export async function confirmDelivery(vol_id, del_id) {
  try {
    await db.execute(
      "UPDATE deliveries SET status = 'vol_confirmed', vol_id = ? WHERE del_id = ?",
      [vol_id, del_id]
    );
    return { success: true };
  } catch (err) {
    console.error("Error confirming delivery:", err);
    return { success: false, message: "Server error" };
  }
}

export async function completeDelivery(del_id) {
  try {
    await db.execute(
      "UPDATE deliveries SET status = 'completed' WHERE del_id = ?",
      [del_id]
    );
    return { success: true };
  } catch (err) {
    console.error("Error completing delivery:", err);
    return { success: false, message: "Server error" };
  }
}
export async function getHistory(id){
  try{
    const [hist] = await db.execute("SELECT * FROM deliveries WHERE (res_id=?) OR (ngo_id=?) OR (vol_id=?)", [id, id, id])
    console.log(hist)
    return hist;
  }catch(err){
     console.error("Error to find history: ",err)
     return { success: false, message: "Server error" };
  }

}