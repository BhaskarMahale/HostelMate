const router = require('express').Router();
const { makePayment, getAllPayments, getMyPayments } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

router.post('/', protect, makePayment);
router.get('/all', protect, adminOnly, getAllPayments);
router.get('/mine', protect, getMyPayments);

module.exports = router;