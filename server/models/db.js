
import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config();
const db=await mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USERNAME,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
    port:process.env.MYSQL_PORT,
    ssl: {
  rejectUnauthorized: false,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}
})
console.log('database connected')
export default db;
