import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Config
dotenv.config();
// Handle .env file location if it's not in root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());

// Database Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'juice_world',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create Orders Table if not exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    items JSON NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

pool.query(createTableQuery)
    .then(() => console.log('✅ Orders table ready'))
    .catch(err => console.error('❌ Failed to create orders table:', err.message));

// Test DB Connection
pool.getConnection()
    .then(connection => {
        console.log('✅ Connected to MySQL database');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err.message);
    });

// Routes
// Get all Preset Products
/*
  Example Schema Assumption for 'products':
  id, name, description, price, calories, colorHex, benefits (JSON or CSV), ingredients (JSON or relation)
  
  For now, we'll just check connection.
*/

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

app.post('/api/orders', async (req, res) => {
    try {
        const { items, total } = req.body;

        // Basic validation
        if (!items || !total) {
            return res.status(400).json({ status: 'error', message: 'Missing items or total' });
        }

        const [result] = await pool.query(
            'INSERT INTO orders (items, total) VALUES (?, ?)',
            [JSON.stringify(items), total]
        );

        res.json({
            status: 'success',
            message: 'Order created',
            orderId: result.insertId
        });
    } catch (error) {
        console.error('Order creation failed:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.get('/api/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 as val');
        res.json({ status: 'success', data: rows });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
