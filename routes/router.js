const express = require('express');
const {handleGenerateNewShortUrl, handleGetAnalytics} = require('../controllers/controller')

const router = express.Router();

router.post('/', handleGenerateNewShortUrl);

// analytics
router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router;