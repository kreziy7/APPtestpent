const Note = require('../models/note.model');

exports.getNotes = async (req, res, next) => {
    try {
        const notes = await Note.getAll();
        res.status(200).json(notes);
    } catch (err) {
        next(err);
    }
};

exports.getNoteById = async (req, res, next) => {
    try {
        const note = await Note.getById(req.params.id);
        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (err) {
        next(err);
    }
};

exports.createNote = async (req, res, next) => {
    try {
        const { title, text } = req.body;
        if (!title || !text) {
            return res.status(400).json({ success: false, message: 'Title and text are required' });
        }
        const newNote = await Note.create({ title, text });
        res.status(201).json(newNote);
    } catch (err) {
        next(err);
    }
};

exports.deleteNote = async (req, res, next) => {
    try {
        const deletedNote = await Note.delete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }
        res.status(200).json({ success: true, message: 'Note deleted' });
    } catch (err) {
        next(err);
    }
};
