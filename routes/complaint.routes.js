const router = require('express').Router();
const { submitComplaint, getAllComplaints, getMyComplaints, updateStatus } = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.single('image'), submitComplaint);
router.get('/all', protect, adminOnly, getAllComplaints);
router.get('/mine', protect, getMyComplaints);
router.put('/:id/status', protect, adminOnly, updateStatus);

module.exports = router;