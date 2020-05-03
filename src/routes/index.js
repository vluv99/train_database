var express = require('express');
var router = express.Router();

let controller = require('../controllers');

router.use('/', require('../controllers/index'))

router.use('/api/train', require('../controllers/cont_train_search'))
router.use('/profile/*', require('../controllers/profile'))
router.use('/api/stations', require('../controllers/cont_station_search'))
router.use('/api/change-password', require('../controllers/cont_password_change'))
//router.use('/api/add-salary', require('../controllers/cont_add_payment'))
router.use('/api/workers/', require('../controllers/cont_worker_management'))
router.use('/api/registration/', require('../controllers/cont_register_user'))
router.use('/api/worker_salary/', require('../controllers/cont_salary_management'))
router.use('/api/leaves/', require('../controllers/cont_leaves'))

router.use('/sign_up', require('../controllers/sign_up'))
router.use('/sign_out', require('../controllers/sign_out'))

router.use('/purchase_history', require('../controllers/purchase_history'))
router.use('/salary_management', require('../controllers/salary_management'))
router.use('/worker_management', require('../controllers/worker_management'))
router.use('/stations', require('../controllers/stations'))
router.use('/worker_data', require('../controllers/worker_data'))
router.use('/leaves', require('../controllers/leaves'))
router.use('/ticket_buy', require('../controllers/cont_ticket_buy'))

module.exports = router;