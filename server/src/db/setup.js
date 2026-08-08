// Run with: npm run db:setup
// Reads schema.sql and executes it against your Neon database.
const fs = require('fs');
const path = require('path');
const pool = require('./pool');

async function setup() {
  try {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(schema);
    console.log('✅ Tables created successfully (users, entries)');
  } catch (err) {
    console.error('❌ Error setting up database:', err.message);
  } finally {
    await pool.end();
  }
}

setup();
