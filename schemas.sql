CREATE TABLE users (
    email VARCHAR UNIQUE NOT NULL PRIMARY KEY,
    password VARCHAR NOT NULL,
    age INTEGER NOT NULL,
    country VARCHAR NOT NULL,
    verification VARCHAR,
    verified BOOLEAN
);

//password decoded is abcd1234

INSERT INTO users VALUES ('greg@ory.com', 'e9cee71ab932fde863338d08be4de9dfe39ea049bdafb342ce659ec5450b69ae', 28, 'Australia', 'hi', false);

CREATE TABLE timer_info (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email VARCHAR REFERENCES users(email),
    name VARCHAR NOT NULL,
    date_created DATE DEFAULT CURRENT_DATE,
    date_of_last_use DATE DEFAULT CURRENT_DATE,
    frequency INTEGER DEFAULT 0
);

CREATE TABLE timer_data (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    info_id uuid REFERENCES timer_info(id),
    date_created DATE NOT NULL DEFAULT CURRENT_DATE,
    time_elapsed INTERVAL DEFAULT '0 seconds'
);
