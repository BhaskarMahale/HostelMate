const cron = require('node-cron');
const Payment = require('../models/Payment');
const User = require('../models/User');
const { sendEmail } = require('./emailService');

cron.schedule('0 8 1 * *', async () => {
  console.log('📧 Running monthly fee reminder...');
  try {
    const unpaidPayments = await Payment.find({ status: 'unpaid' })
      .populate('studentId', 'name email');

    for (const payment of unpaidPayments) {
      await sendEmail(
        payment.studentId.email,
        'HostelMate — Fee Reminder',
        `Dear ${payment.studentId.name},\n\nYour fee for ${payment.month} of ₹${payment.amount} is unpaid.\n\n— HostelMate Team`
      );
    }
    console.log(`✅ Reminders sent to ${unpaidPayments.length} students`);
  } catch (err) {
    console.error('❌ Cron error:', err.message);
  }
});