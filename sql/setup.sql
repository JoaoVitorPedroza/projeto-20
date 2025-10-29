DROP TABLE IF EXISTS recharges;
DROP TABLE IF EXISTS phones;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS carriers;

CREATE TABLE carriers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  code INT NOT NULL
);
INSERT INTO carriers (name, code) VALUES ('Vivo', 15);
INSERT INTO carriers (name, code) VALUES ('Tim', 41);
INSERT INTO carriers (name, code) VALUES ('Oi', 31);
INSERT INTO carriers (name, code) VALUES ('Claro', 21);
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    document VARCHAR(14) NOT NULL UNIQUE
);
CREATE TABLE phones (
    id SERIAL PRIMARY KEY,
    client_document VARCHAR(14) NOT NULL REFERENCES clients(document),
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    carrier_name VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL
);
CREATE TABLE recharges (
    id SERIAL PRIMARY KEY,
    phone_id INTEGER NOT NULL REFERENCES phones(id),
    user_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    fee INTEGER NOT NULL,
    timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    status VARCHAR(50) NOT NULL DEFAULT 'Success'
);