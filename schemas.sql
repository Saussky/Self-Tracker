CREATE TABLE users (
    email VARCHAR UNIQUE NOT NULL PRIMARY KEY,
    password VARCHAR NOT NULL,
    age INTEGER NOT NULL,
    country VARCHAR NOT NULL
);

INSERT INTO users VALUES ('greg@ory.com', 'abcd1234', 28, 'Australia')