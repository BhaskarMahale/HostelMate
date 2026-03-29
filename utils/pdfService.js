const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateReceiptPDF = (payment, user) => {
  return new Promise((resolve, reject) => {
    const fileName = `receipt-${payment._id}.pdf`;
    const filePath = path.join('uploads', fileName);
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(20).text('HostelMate — Payment Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Student: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Month: ${payment.month}`);
    doc.text(`Amount: ₹${payment.amount}`);
    doc.text(`Status: ${payment.status.toUpperCase()}`);
    doc.text(`Date: ${new Date(payment.createdAt).toLocaleDateString()}`);
    doc.end();

    doc.on('finish', () => resolve(fileName));
    doc.on('error', reject);
  });
};

module.exports = { generateReceiptPDF };