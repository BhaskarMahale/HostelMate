import api from './api';

export const getDashboard  = () => api.get('/students/dashboard');
export const getAllStudents = () => api.get('/students/all');
export const checkIn       = () => api.post('/students/checkin');
export const checkOut      = () => api.post('/students/checkout');
export const getQRCode     = () => api.get('/students/qrcode');