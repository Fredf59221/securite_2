CREATE DATABASE eventhub;
USE eventhub;
CREATE TABLE users (
    us_id INT PRIMARY KEY AUTO_INCREMENT,
    us_username VARCHAR(255) NOT NULL UNIQUE,
    us_password TEXT NOT NULL,
    us_email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE events (
    ev_id INT PRIMARY KEY AUTO_INCREMENT,
    ev_title VARCHAR(255) NOT NULL,
    ev_description TEXT,
    ev_date DATE,
    ev_location VARCHAR(255),
    ev_owner INT NOT NULL,
    FOREIGN KEY (ev_owner) REFERENCES users(us_id)
);

CREATE TABLE comments (
    co_id INT PRIMARY KEY AUTO_INCREMENT,
    co_comment TEXT NOT NULL,
    co_user INT NOT NULL,
    co_event INT NOT NULL,
    FOREIGN KEY (co_user) REFERENCES users(us_id),
    FOREIGN KEY (co_event) REFERENCES events(ev_id)
);

CREATE TABLE participants (
    pa_user INT,
    pa_event INT,
    PRIMARY KEY (pa_user, pa_event),
    FOREIGN KEY (pa_user) REFERENCES users(us_id),
    FOREIGN KEY (pa_event) REFERENCES events(ev_id)
);

CREATE USER 'event_user'@'localhost' IDENTIFIED BY 'mdp';
GRANT SELECT, INSERT, UPDATE, DELETE ON eventhub.* TO 'event_user'@'localhost';
FLUSH PRIVILEGES;