const { Op } = require('sequelize');
const Note = require('../models/Note');

// @desc    Get all notes (with pagination, search, sort)
// @route   GET /notes
// @access  Public
const getNotes = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, q = '', sort = 'DESC' } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = q ? {
            title: { [Op.iLike]: `%${q}%` }
        } : {};

        const { count, rows: notes } = await Note.findAndCountAll({
            where: whereClause,
            order: [['createdAt', sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        res.status(200).json({
            notes,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            totalNotes: count
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Search notes (specific endpoint as requested)
// @route   GET /notes/search
// @access  Public
const searchNotes = async (req, res, next) => {
    try {
        const { q = '' } = req.query;
        const notes = await Note.findAll({
            where: {
                title: { [Op.iLike]: `%${q}%` }
            },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(notes);
    } catch (err) {
        next(err);
    }
};

// @desc    Create a note
// @route   POST /notes
// @access  Public
const createNote = async (req, res, next) => {
    try {
        const { title, text } = req.body;

        if (!title || !text) {
            return res.status(400).json({ message: 'Please provide title and text' });
        }

        const note = await Note.create({ title, text });
        res.status(201).json(note);
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: err.errors[0].message });
        }
        next(err);
    }
};

// @desc    Update a note
// @route   PUT /notes/:id
// @access  Public
const updateNote = async (req, res, next) => {
    try {
        const note = await Note.findByPk(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        await note.update(req.body);
        res.status(200).json(note);
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: err.errors[0].message });
        }
        next(err);
    }
};

// @desc    Delete a note
// @route   DELETE /notes/:id
// @access  Public
const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findByPk(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        await note.destroy();
        res.status(200).json({ message: 'Note removed' });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete all notes
// @route   DELETE /notes
// @access  Public
const deleteAllNotes = async (req, res, next) => {
    try {
        await Note.destroy({ where: {}, truncate: false });
        res.status(200).json({ message: 'All notes removed' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getNotes,
    searchNotes,
    createNote,
    updateNote,
    deleteNote,
    deleteAllNotes,
};
