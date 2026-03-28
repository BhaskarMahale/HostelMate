const Attendance = require('../models/Attendance');
const User = require('../models/User');
const QRCode = require('qrcode');

// GET student dashboard info
const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('roomId');
    res.json({ user });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST QR-based check-in
const checkIn = async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const existing = await Attendance.findOne({ studentId: req.user._id, date: today });
    if (existing?.checkIn) return res.status(400).json({ message: 'Already checked in today' });

    const record = await Attendance.create({
      studentId: req.user._id, checkIn: new Date(), date: today
    });
    res.json({ message: 'Check-in successful', record });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST QR-based check-out
const checkOut = async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const record = await Attendance.findOneAndUpdate(
      { studentId: req.user._id, date: today },
      { checkOut: new Date() },
      { new: true }
    );
    if (!record) return res.status(404).json({ message: 'No check-in found for today' });
    res.json({ message: 'Check-out successful', record });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET generate QR code for student
const getQRCode = async (req, res) => {
  try {
    const data = JSON.stringify({ studentId: req.user._id, name: req.user.name });
    const qrImage = await QRCode.toDataURL(data);
    res.json({ qrCode: qrImage });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET all students (admin)
const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).populate('roomId', 'roomNumber');
    res.json(students);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getDashboard, checkIn, checkOut, getQRCode, getAllStudents };