const adminOnly = (req, res, next) => {
  if (req.user?.role === 'admin') return next();
  res.status(403).json({ message: 'Admin access only' });
};

const studentOnly = (req, res, next) => {
  if (req.user?.role === 'student') return next();
  res.status(403).json({ message: 'Student access only' });
};

module.exports = { adminOnly, studentOnly };