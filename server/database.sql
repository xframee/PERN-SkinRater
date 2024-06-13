CREATE DATABASE skinratingsite;

CREATE TABLE skin_info(
    skin_id SERIAL PRIMARY KEY,
    skin_name VARCHAR(100) NOT NULL,
    skin_type CHAR(1) NOT NULL,
    skin_image VARCHAR(256) NOT NULL
);

CREATE TABLE user(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    user_password VARCHAR(100) NOT NULL
);