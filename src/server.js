require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require("path")
const fs = require("fs")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Připojení k databázi
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// API pro získání žebříčku
app.get('/api/leaderboard', async (req, res) => {
    try {
        const result = await pool.query('SELECT player_name, attempts FROM scores ORDER BY attempts ASC LIMIT 10');
        res.json(result.rows);
    } catch (error) {
        console.error('Chyba při získávání žebříčku:', error);
        res.status(500).json({ error: 'Interní chyba serveru' });
    }
});

// API pro uložení skóre
app.post('/api/submit-score', async (req, res) => {
    const { player_name, attempts } = req.body;

    if (!player_name || typeof attempts !== 'number') {
        return res.status(400).json({ error: 'Neplatná data' });
    }

    try {
        await pool.query('INSERT INTO scores (player_name, attempts) VALUES ($1, $2)', [player_name, attempts]);
        res.json({ message: 'Skóre uloženo!' });
    } catch (error) {
        console.error('Chyba při ukládání skóre:', error);
        res.status(500).json({ error: 'Interní chyba serveru' });
    }
});

const PUBLIC_DIR = path.join(__dirname, "../public");
app.get("*", (req, res) => {
    let p = path.join(PUBLIC_DIR, "." + req.url)
    if (fs.statSync(p).isDirectory()) {
        p += "index.html";
    }
    if (fs.existsSync(p)) {
        res.sendFile(p);
        return;
    }
    res.send("404")
})

app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});
