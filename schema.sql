CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO categories (name) VALUES ('Bollywood');
INSERT INTO categories (name) VALUES ('Hollywood');
INSERT INTO categories (name) VALUES ('Pakistani Cinema');
INSERT INTO categories (name) VALUES ('Animation');
INSERT INTO categories (name) VALUES ('Documentary');

INSERT INTO movies (title, year, category_id) VALUES ('3 Idiots', 2009, 1);
INSERT INTO movies (title, year, category_id) VALUES ('Dangal', 2016, 1);
INSERT INTO movies (title, year, category_id) VALUES ('Inception', 2010, 2);
INSERT INTO movies (title, year, category_id) VALUES ('The Legend of Maula Jatt', 2022, 3);
INSERT INTO movies (title, year, category_id) VALUES ('Coco', 2017, 4);