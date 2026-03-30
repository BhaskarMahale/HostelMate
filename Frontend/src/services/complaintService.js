import api from './api';

export const submitComplaint  = (data) => api.post('/complaints', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getAllComplaints = () => api.get('/complaints/all');
export const getMyComplaints  = () => api.get('/complaints/mine');
export const updateStatus     = (id, status) => api.put(`/complaints/${id}/status`, { status });