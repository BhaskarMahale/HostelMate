const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount:    { type: Number, required: true },
  month:     { type: String, required: true }, // "January 2024"
  status:    { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  receipt:   { type: String, default: null } // PDF path
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);