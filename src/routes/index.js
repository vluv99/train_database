var express = require('express');
var router = express.Router();

let controller = require('../controllers');

router.get('/', controller.index)

router.use('/api/train', require('../controllers/train_search.js'))

module.exports = router;