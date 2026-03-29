const router = require('express').Router();
const { getAllRooms, createRoom, allocateRoom, deallocateRoom } = require('../controllers/roomController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

router.get('/', protect, getAllRooms);
router.post('/', protect, adminOnly, createRoom);
router.put('/allocate', protect, adminOnly, allocateRoom);
router.put('/deallocate', protect, adminOnly, deallocateRoom);

module.exports = router;