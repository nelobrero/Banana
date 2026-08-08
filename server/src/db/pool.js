const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // needed for Neon
});

pool.on('connect', () => {
  console.log('Connected to Postgres (Neon)');
});

pool.on('error', (err) => {
  console.error('Unexpected Postgres error', err);
});

module.exports = pool;
