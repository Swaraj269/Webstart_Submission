import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mysql from "mysql2"

dotenv.config()
const config = {
  host: 'localhost',
  user: process.env.DB_user,
  password: process.env.DB_pass,
  database: process.env.DB_name, 
};

const app= express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const testConnection = async () => {
  try {
    const connection = await mysql.createConnection(config);
    console.log('Connected');

    await connection.end();
    console.log('Connection closed.');
  } catch (err) {
    console.error('Connection failed:', err.message);
  }
};

testConnection();

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));