const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.sqlite");

// Tables
db.run("CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, name TEXT)");
db.run("CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY, name TEXT, category_id INTEGER)");

db.run("INSERT OR IGNORE INTO categories (id, name) VALUES (1, 'Bollywood'), (2, 'Hollywood'), (3, 'Pakistani Cinema')");

// Fetch movies
app.get("/movies", (req, res) => {
    let sql = `
        SELECT movies.name, categories.name AS category
        FROM movies
        JOIN categories ON movies.category_id = categories.id
    `;

    if (req.query.category) {
        sql += ` WHERE category_id = ${req.query.category}`;
    }

    db.all(sql, (err, rows) => {
        res.json(rows);
    });
});

// Add movie
app.post("/movies", (req, res) => {
    const { name, category } = req.body;

    db.run("INSERT INTO movies (name, category_id) VALUES (?, ?)", [name, category], () => {
        res.json({ message: "Movie added!" });
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
