var express = require('express');
var router = express.Router();

let controller = require('../controllers');

router.get('/', controller.index)

router.use('/api/train', require('../controllers/train_search.js'))
router.use('/profile/*', require('../controllers/profile'))

router.get('/sign_up', require('../controllers/sign_up'))

router.get('/purchase_history', require('../controllers/purchase_history'))
router.get('/trains', require('../controllers/trains'))
router.get('/stations', require('../controllers/stations'))
router.get('/worker_data', require('../controllers/worker_data'))
router.get('/leaves', require('../controllers/leaves'))

module.exports = router;