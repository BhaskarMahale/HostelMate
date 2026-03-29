    const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  checkIn:   { type: Date },
  checkOut:  { type: Date },
  date:      { type: String, required: true } // "2024-01-15"
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);