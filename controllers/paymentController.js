const Payment = require('../models/Payment');
const { generateReceiptPDF } = require('../utils/pdfService');

// POST make payment (student)
const makePayment = async (req, res) => {
  try {
    const { amount, month } = req.body;
    const payment = await Payment.create({
      studentId: req.user._id, amount, month, status: 'paid'
    });

    // Generate PDF receipt
    const receiptPath = await generateReceiptPDF(payment, req.user);
    payment.receipt = receiptPath;
    await payment.save();

    res.status(201).json({ message: 'Payment successful', payment });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET all payments (admin)
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('studentId', 'name email');
    res.json(payments);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET my payments (student)
const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ studentId: req.user._id });
    res.json(payments);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { makePayment, getAllPayments, getMyPayments };