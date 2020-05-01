var express = require('express');
var router = express.Router();

let controller = require('../controllers');

router.get('/', controller.index)

router.use('/api/train', require('../controllers/cont_train_search'))
router.use('/profile/*', require('../controllers/profile'))
router.use('/api/stations', require('../controllers/cont_station_search'))
router.use('/api/change-password', require('../controllers/cont_password_change'))


router.get('/sign_up', require('../controllers/sign_up'))
router.use('/sign_out', require('../controllers/sign_out'))

router.get('/purchase_history', require('../controllers/purchase_history'))
router.get('/trains', require('../controllers/trains'))
router.use('/stations', require('../controllers/stations'))
router.get('/worker_data', require('../controllers/worker_data'))
router.get('/leaves', require('../controllers/leaves'))
router.get('/ticket_buy', require('../controllers/cont_ticket_buy'))

module.exports = router;