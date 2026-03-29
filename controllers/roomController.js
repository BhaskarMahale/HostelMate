const Room = require('../models/Room');
const User = require('../models/User');

// GET all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('occupants', 'name email');
    res.json(rooms);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST create room (admin)
const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT allocate student to room (admin)
const allocateRoom = async (req, res) => {
  const { roomId, studentId } = req.body;
  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    if (room.occupants.length >= room.capacity)
      return res.status(400).json({ message: 'Room is full' });

    room.occupants.push(studentId);
    if (room.occupants.length === room.capacity) room.status = 'full';
    await room.save();

    await User.findByIdAndUpdate(studentId, { roomId });
    res.json({ message: 'Room allocated successfully', room });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// DELETE remove student from room
const deallocateRoom = async (req, res) => {
  const { roomId, studentId } = req.body;
  try {
    const room = await Room.findById(roomId);
    room.occupants = room.occupants.filter(id => id.toString() !== studentId);
    room.status = 'available';
    await room.save();
    await User.findByIdAndUpdate(studentId, { roomId: null });
    res.json({ message: 'Student removed from room' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getAllRooms, createRoom, allocateRoom, deallocateRoom };