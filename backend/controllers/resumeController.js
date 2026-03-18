const Resume = require('../models/Resume');

// @desc    Get user's resume
// @route   GET /resume
// @access  Public
const getResume = async (req, res, next) => {
    try {
        const resume = await Resume.findOne({ where: { userId: 'default_student' } });
        if (!resume) {
            // Create a default if not found
            return res.status(200).json({
                name: 'Student User',
                email: 'student@example.com',
                phone: '+998 90 123 45 67',
                education: 'Tashkent University of Information Technologies',
                experience: 'Junior Web Developer at TechCorp',
                skills: 'React, Node.js, PostgreSQL, Tailwind CSS'
            });
        }
        res.status(200).json(resume);
    } catch (err) {
        next(err);
    }
};

// @desc    Upsert user's resume
// @route   POST /resume
// @access  Public
const updateResume = async (req, res, next) => {
    try {
        const { name, email, phone, education, experience, skills } = req.body;

        let resume = await Resume.findOne({ where: { userId: 'default_student' } });

        if (resume) {
            await resume.update({ name, email, phone, education, experience, skills });
        } else {
            resume = await Resume.create({ userId: 'default_student', name, email, phone, education, experience, skills });
        }

        res.status(200).json(resume);
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: err.errors[0].message });
        }
        next(err);
    }
};

module.exports = {
    getResume,
    updateResume,
};
