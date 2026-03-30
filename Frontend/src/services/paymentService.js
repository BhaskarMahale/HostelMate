import api from './api';

export const makePayment   = (data) => api.post('/payments', data);
export const getAllPayments = ()     => api.get('/payments/all');
export const getMyPayments = ()     => api.get('/payments/mine');