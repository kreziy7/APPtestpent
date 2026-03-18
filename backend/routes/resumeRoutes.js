const express = require('express');
const router = express.Router();
const {
    getResume,
    updateResume,
} = require('../controllers/resumeController');

router.route('/')
    .get(getResume)
    .post(updateResume);

module.exports = router;
