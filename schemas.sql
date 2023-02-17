CREATE TABLE users (
    email VARCHAR UNIQUE NOT NULL PRIMARY KEY,
    password VARCHAR NOT NULL,
    age INTEGER NOT NULL,
    country VARCHAR NOT NULL,
    verification VARCHAR,
    verified BOOLEAN
);

INSERT INTO users VALUES ('greg@ory.com', 'abcd1234', 28, 'Australia')