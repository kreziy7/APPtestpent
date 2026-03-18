require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const noteRoutes = require('./routes/noteRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/notes', noteRoutes);
app.use('/resume', resumeRoutes);

// Error Handler
app.use(errorHandler);

// Database Sync and Server Connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL connected via Sequelize');

        // Sync models
        await sequelize.sync({ force: false }); // set to true to drop tables on every startup
        console.log('Database synced');

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('Database connection error:', err);
    }
})();
