const express = require('express');
const router = express.Router();
const {
    getNotes,
    searchNotes,
    createNote,
    updateNote,
    deleteNote,
    deleteAllNotes,
} = require('../controllers/noteController');

router.route('/')
    .get(getNotes)
    .post(createNote)
    .delete(deleteAllNotes);

router.route('/search')
    .get(searchNotes);

router.route('/:id')
    .put(updateNote)
    .delete(deleteNote);

module.exports = router;
