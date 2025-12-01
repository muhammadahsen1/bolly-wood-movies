CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE movies (
    id INTEGER PRIMARY KEY,
    name TEXT,
    category_id INTEGER,
    FOREIGN KEY(category_id) REFERENCES categories(id)
);

INSERT INTO categories (id, name) VALUES
(1, 'Bollywood'),
(2, 'Hollywood'),
(3, 'Pakistani Cinema');

INSERT INTO movies (name, category_id) VALUES
('Kabhi Khushi Kabhie Gham', 1),
('3 Idiots', 1),
('Avengers', 2),
('Inception', 2),
('Bol', 3),
('Khuda Kay Liye', 3);

-- Basic Select
SELECT * FROM movies;

-- Join Query
SELECT movies.name, categories.name
FROM movies
JOIN categories ON movies.category_id = categories.id;

-- Filtered
SELECT * FROM movies WHERE category_id = 1 ORDER BY name;
