import jwt from "jsonwebtoken"
const secret = JWT_SECRET; 
export function generateToken(id,name,email,address,phn_no){
    const payload={
        id:id,
        name:name,
        email:email,
        address:address,
        phn_no:phn_no
    }
    const token=jwt.sign(payload,secret)
    return token
}
export function validateToken(token){
    const verified=jwt.verify(token,secret)
    return verified;
}