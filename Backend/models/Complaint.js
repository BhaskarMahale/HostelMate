const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  studentId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true },
  description: { type: String, required: true },
  image:       { type: String, default: null }, // uploaded image path
  status:      { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);