-- AUTHENTICATION
-- Users
CREATE TABLE users (
    email VARCHAR UNIQUE NOT NULL PRIMARY KEY,
    password VARCHAR NOT NULL,
    age INTEGER NOT NULL,
    country VARCHAR NOT NULL,
    verification VARCHAR,
    verified BOOLEAN
);

-- password decoded is abcd1234
INSERT INTO users VALUES ('greg@ory.com', 'e9cee71ab932fde863338d08be4de9dfe39ea049bdafb342ce659ec5450b69ae', 28, 'Australia', 'hi', false);

-- GENERAL
-- Timers
-- TODO(maybe?): Add the timer_data id to an array in timer_info so it has all the id's right there and you can tell frequency by counting? Might be excessive
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


--Counters
CREATE TABLE counter_info (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email VARCHAR REFERENCES users(email),
    name VARCHAR NOT NULL,
    date_created DATE DEFAULT CURRENT_DATE,
    date_of_last_use DATE DEFAULT CURRENT_DATE,
    frequency INTEGER DEFAULT 0
);

CREATE TABLE counter_data (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    info_id uuid REFERENCES counter_info(id),
    date_created DATE NOT NULL DEFAULT CURRENT_DATE,
    amount INTEGER DEFAULT 0
);

-- WORKOUT
-- Gym
CREATE TABLE gym_exercises (
    user_email VARCHAR REFERENCES users(email),
    compound VARCHAR[],
    push VARCHAR[],
    pull VARCHAR[],
    legs VARCHAR[],
    core VARCHAR[],
    other VARCHAR[],
    UNIQUE(user_email)
)

CREATE TABLE gym_sessions (
  id uuid DEFAULT gen_random_uuid()PRIMARY KEY,
  user_email VARCHAR REFERENCES users(email),
  start_time TIMESTAMP NOT NULL DEFAULT NOW(),
  end_time TIMESTAMP,
  UNIQUE(id, user_email, start_time),
  CHECK(start_time < end_time)
);

CREATE TABLE gym_sets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid REFERENCES gym_sessions(id),
  category VARCHAR NOT NULL,
  exercise VARCHAR NOT NULL,
  reps INTEGER NOT NULL,
  weight INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);