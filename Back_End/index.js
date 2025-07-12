import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mysql from "mysql2"
import bcrypt from "bcrypt"

dotenv.config()
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_user,
  password: process.env.DB_pass,
  database: process.env.DB_name, 
});

const app= express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected.');
});

app.post('/register', async (req, res) => {
    console.log("Received request at /register");
  const { name, email, phone, password, confirmPassword } = req.body;
  console.log(req.body); 
  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    db.query(
      'SELECT * FROM users WHERE email = ? OR phone = ?',
      [email, phone],
      async (err, results) => {
        if (err) return res.status(500).send("Server error");

        if (results.length > 0) {
          return res.status(400).send("User with this email or phone already exists");
        }

        const hash = await bcrypt.hash(password, 10);

        db.query(
          'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
          [name, email, phone, hash],
          (err) => {
            if (err) return res.status(500).send("Failed to insert user");
            res.status(201).json({ message: "User registered successfully" });
          }
        );
      }
    );
  } catch (err) {
    res.status(500).send("Unexpected server error");
  }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));