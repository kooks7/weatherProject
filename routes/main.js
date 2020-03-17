const path = require('path');

const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');

router.get('/', mainController.getMain);

module.exports = router;
