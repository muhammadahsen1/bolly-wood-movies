const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// If DB doesn't exist, create and load schema.sql
if (!fs.existsSync('./database.sqlite')) {
    console.log("Creating new database...");
    const db = new sqlite3.Database('./database.sqlite');

    const schema = fs.readFileSync('./schema.sql', 'utf-8');
    db.exec(schema);
    db.close();
}

const db = new sqlite3.Database('./database.sqlite');

// GET all movies
app.get('/movies', (req, res) => {
    db.all(
        `SELECT movies.id, movies.title, movies.year, categories.name AS category
         FROM movies 
         JOIN categories ON movies.category_id = categories.id`,
        [],
        (err, rows) => res.json(rows)
    );
});

// Add new movie
app.post('/movies', (req, res) => {
    const { title, year, category_id } = req.body;

    db.run(
        `INSERT INTO movies (title, year, category_id) VALUES (?, ?, ?)`,
        [title, year, category_id],
        function(err) {
            res.json({ id: this.lastID });
        }
    );
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log("Backend running on port " + PORT);
});
