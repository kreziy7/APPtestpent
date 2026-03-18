const { pool } = require('../db');

class Note {
    static async getAll() {
        const result = await pool.query('SELECT * FROM notes ORDER BY date DESC');
        return result.rows;
    }

    static async getById(id) {
        const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async create({ title, text }) {
        const result = await pool.query(
            'INSERT INTO notes (title, text) VALUES($1, $2) RETURNING *',
            [title, text]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = Note;
