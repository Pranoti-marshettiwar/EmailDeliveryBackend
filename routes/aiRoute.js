const express = require('express');
const { generateSuggestions } = require('../controllers/aiController').default;
const router = express.Router();

router.post('/suggestions', generateSuggestions);

module.exports = router;
