const express = require('express');
const { handleGenerateNewShortURL, getAllURLs } = require('../controllers/urlController');
const router = express.Router();

router.post('/', handleGenerateNewShortURL);
router.get('/', getAllURLs);

module.exports = router;
