// EXPRESS
var express = require('express');
var router = express.Router();

// CONTROLLERS
var controller_main = require('../controllers/main');

/* GET home page. */
router.get('/', controller_main.index);

module.exports = router;
