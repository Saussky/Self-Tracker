CREATE TABLE users (
    email VARCHAR UNIQUE NOT NULL PRIMARY KEY,
    password VARCHAR NOT NULL,
    age INTEGER NOT NULL,
    country VARCHAR NOT NULL,
    verification VARCHAR,
    verified BOOLEAN
);

//password uncoded is abcd1234

INSERT INTO users VALUES ('greg@ory.com', 'e9cee71ab932fde863338d08be4de9dfe39ea049bdafb342ce659ec5450b69ae', 28, 'Australia', 'hi', false);

CREATE TABLE timers (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    frequency INTEGER,
    date_of_last_use DATE,
    time_elapsed_today INTERVAL,
    time_elapsed_all INTERVAL,
    user_email VARCHAR REFERENCES users(email)
);