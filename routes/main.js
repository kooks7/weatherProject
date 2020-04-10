const path = require('path');

const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');

router.get('/', mainController.getMain);
router.get('/search', mainController.getSearch);
router.post('/search', mainController.postSearch);

module.exports = router;
