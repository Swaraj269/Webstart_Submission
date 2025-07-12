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
            res.status(201).json({ message: "User registered successfully", redirectTo: "/dashboard" });
          }
        );
      }
    );
  } catch (err) {
    res.status(500).send("Unexpected server error");
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).send("Server error");

      if (results.length === 0) {
        return res.status(401).send("Invalid email or password");
      }

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send("Invalid email or password");
      }
      res.status(200).json({
        message: "Login successful",
        redirectTo: "/dashboard",
        userId: user.id  
      });

    }
  );
});

app.get('/dashboard', (req, res) => {
  const userId = req.query.userId; 

  if (!userId) {
    return res.status(400).json({ message: 'Missing userId' });
  }

  const getUser = `SELECT id, name, email, phone FROM users WHERE id = ?`;
  db.query(getUser, [userId], (err, userResults) => {
    if (err) return res.status(500).send("Error fetching user");

    if (userResults.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = userResults[0];
    console.log(user)

    const getListings = `SELECT id, title, description, image_url FROM listings WHERE seller_id = ?`;
    db.query(getListings, [userId], (err, listings) => {
      if (err) return res.status(500).send("Error fetching listings");

      const getPurchases = `
        SELECT p.id AS purchase_id, l.title, l.description, l.image_url, p.purchase_date
        FROM purchases p
        JOIN listings l ON p.listing_id = l.id
        WHERE p.buyer_id = ?
      `;
      db.query(getPurchases, [userId], (err, purchases) => {
        if (err) return res.status(500).send("Error fetching purchases");

        res.json({
          user,
          listings,
          purchases
        });
      });
    });
  });
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));