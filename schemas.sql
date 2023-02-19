CREATE TABLE users (
    email VARCHAR UNIQUE NOT NULL PRIMARY KEY,
    password VARCHAR NOT NULL,
    age INTEGER NOT NULL,
    country VARCHAR NOT NULL,
    verification VARCHAR,
    verified BOOLEAN
);

INSERT INTO users VALUES ('greg@ory.com', 'abcd1234', 28, 'Australia');

CREATE TABLE timers (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    frequency INTEGER,
    date_of_last_use DATE,
    time_elapsed_today INTERVAL,
    time_elapsed_all INTERVAL,
    user_email VARCHAR REFERENCES users(email)
);