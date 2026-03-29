const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type:       { type: String, enum: ['single', 'double', 'triple'], required: true },
  capacity:   { type: Number, required: true },
  occupants:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status:     { type: String, enum: ['available', 'full', 'maintenance'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);