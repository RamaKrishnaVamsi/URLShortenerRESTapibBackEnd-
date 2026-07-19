const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController.js');
const auth = require('../middleware/auth.js');

const {createShortUrl , redirectUrl , getMyUrls , deleteUrls} = require('../controllers/urlController.js');

router.post('/' , auth , createShortUrl);

router.get('/analytics/:shortCode',auth , urlController.getAnalytics);

// router.get("/:shortCode", redirectUrl);

router.get("/myurls", auth , getMyUrls);

router.delete("/:id" , auth , deleteUrls);

module.exports = router;