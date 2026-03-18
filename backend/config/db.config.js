require('dotenv').config();

module.exports = {
    db: {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'student_notes',
        password: process.env.DB_PASSWORD || 'password',
        port: process.env.DB_PORT || 5432,
    },
    port: process.env.PORT || 5000,
};
