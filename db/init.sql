CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE quakes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usgs_id TEXT UNIQUE NOT NULL,
  mag REAL,
  place TEXT,
  lat REAL,
  lon REAL,
  depth REAL,
  occurred_at TIMESTAMP
);