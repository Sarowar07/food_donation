import NodeGeocoder from "node-geocoder";

const options={
     provider: 'openstreetmap',
}
const geocoder=NodeGeocoder(options)

export async function getCoordinates(address){
      const res=geocoder.geocode(address)
      const lattitude=res[0].lattitude
      const longtitude=res[0].longtitude
      return lattitude,longtitude
}