const { Pool } = require('pg');
const config = require('./config/db.config');

const pool = new Pool(config.db);

const initDb = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      text TEXT NOT NULL,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    try {
        const res = await pool.query(queryText);
        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
};

module.exports = {
    pool,
    initDb
};
