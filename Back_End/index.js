import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";  
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create connection pool (better than single connection for promises)
const db = await mysql.createPool({
  host: 'localhost',
  user: process.env.DB_user,
  password: process.env.DB_pass,
  database: process.env.DB_name
});

// REGISTER endpoint
app.post('/register', async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    const [existing] = await db.query(
      'SELECT * FROM users WHERE email = ? OR phone = ?',
      [email, phone]
    );

    if (existing.length > 0) {
      return res.status(400).send("User with this email or phone already exists");
    }

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
      [name, email, phone, hash]
    );

    res.status(201).json({ message: "User registered successfully", redirectTo: "/dashboard" });
  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).send("Server error");
  }
});

// LOGIN endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  try {
    const [results] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    console.log("DB results:", results);  // ← Add this line

    if (results.length === 0) {
      console.log("No user found");
      return res.status(401).send("Invalid email or password");
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).send("Invalid email or password");
    }

    console.log("Login successful");
    res.status(200).json({
      message: "Login successful",
      redirectTo: "/dashboard",
      userId: user.id
    });

  } catch (err) {
    console.error("Error in /login:", err);
    res.status(500).send("Server error");
  }
});

// DASHBOARD endpoint
app.get('/dashboard', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ message: 'Missing userId' });

  try {
    const [userResults] = await db.query(
      `SELECT id, name, email, phone FROM users WHERE id = ?`,
      [userId]
    );

    if (userResults.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = userResults[0];

    const [listings] = await db.query(
      `SELECT id, title, description, image_url FROM listings WHERE seller_id = ?`,
      [userId]
    );

    const [purchases] = await db.query(
      `SELECT p.id AS purchase_id, l.title, l.description, l.image_url, p.purchase_date
       FROM purchases p
       JOIN listings l ON p.listing_id = l.id
       WHERE p.buyer_id = ?`,
      [userId]
    );

    res.json({
      user,
      listings,
      purchases
    });
  } catch (err) {
    console.error("Error in /dashboard:", err);
    res.status(500).send("Error fetching dashboard data");
  }
});

// LISTINGS endpoint
app.get('/items', async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT id, title, description, image_url, seller_id FROM listings'
    );

    res.status(200).json({ listings: results });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).send("Error fetching listings");
  }
});


app.get('/admin', async (req, res) => {
  const adminId = req.query.adminId;
  if (!adminId) return res.status(400).json({ message: 'Missing adminId' });

  try {
    
    const [adminCheck] = await db.query(
      'SELECT is_admin FROM users WHERE id = ?',
      [adminId]
    );

    if (adminCheck.length === 0 || !adminCheck[0].is_admin) {
      return res.status(403).json({ message: 'Access denied: Not an admin' });
    }

    const [users] = await db.query(
      'SELECT id, name, email, phone, is_admin FROM users'
    );

    const [listings] = await db.query(
      'SELECT id, title, description, image_url, seller_id FROM listings'
    );

    res.status(200).json({ users, listings });
  } catch (err) {
    console.error("Error in /admin GET:", err);
    res.status(500).send("Error fetching admin data");
  }
});

app.delete('/admin/user/:id', async (req, res) => {
  const adminId = req.query.adminId;
  const userId = req.params.id;

  try {
    const [adminCheck] = await db.query(
      'SELECT is_admin FROM users WHERE id = ?',
      [adminId]
    );

    if (adminCheck.length === 0 || !adminCheck[0].is_admin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    //delete user's listings and purchases first to avoid foreign key issues
    await db.query('DELETE FROM purchases WHERE buyer_id = ?', [userId]);
    await db.query('DELETE FROM listings WHERE seller_id = ?', [userId]);
    await db.query('DELETE FROM users WHERE id = ?', [userId]);

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Error deleting user");
  }
});

// Delete listing
app.delete('/admin/listing/:id', async (req, res) => {
  const adminId = req.query.adminId;
  const listingId = req.params.id;

  try {
    const [adminCheck] = await db.query(
      'SELECT is_admin FROM users WHERE id = ?',
      [adminId]
    );

    if (adminCheck.length === 0 || !adminCheck[0].is_admin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    //delete related purchases first
    await db.query('DELETE FROM purchases WHERE listing_id = ?', [listingId]);
    await db.query('DELETE FROM listings WHERE id = ?', [listingId]);

    res.json({ message: 'Listing deleted successfully' });
  } catch (err) {
    console.error("Error deleting listing:", err);
    res.status(500).send("Error deleting listing");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
