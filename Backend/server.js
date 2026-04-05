const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes      = require('./routes/auth.routes');
const roomRoutes      = require('./routes/room.routes');
const studentRoutes   = require('./routes/student.routes');
const complaintRoutes = require('./routes/complaint.routes');
const paymentRoutes   = require('./routes/payment.routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth',       authRoutes);
app.use('/api/rooms',      roomRoutes);
app.use('/api/students',   studentRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/payments',   paymentRoutes);

app.get('/', (req, res) => {
  res.send('HostelMate API is running 🚀');
});

const PORT = process.env.PORT || 5000;

// DB connect झाल्यावरच server + cron start करा
connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  require('./utils/cronJob'); // DB नंतर cron start
}); 