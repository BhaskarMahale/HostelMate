const router = require('express').Router();
const { getDashboard, checkIn, checkOut, getQRCode, getAllStudents } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

router.get('/dashboard', protect, getDashboard);
router.post('/checkin', protect, checkIn);
router.post('/checkout', protect, checkOut);
router.get('/qrcode', protect, getQRCode);
router.get('/all', protect, adminOnly, getAllStudents);

module.exports = router;
