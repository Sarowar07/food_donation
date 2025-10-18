import NodeGeocoder from "node-geocoder";

const options = {
  provider: "openstreetmap",
};
const geocoder = NodeGeocoder(options);

export async function getCoordinates(address) {
  try {
    const res = await geocoder.geocode(address);

    if (!res || res.length === 0) {
      return { latitude: null, longitude: null };
    }

    const { latitude, longitude } = res[0];
    return { latitude, longitude };
  } catch (err) {
    console.error("Geocoding failed:", err.message);
    return { latitude: null, longitude: null };
  }
}
