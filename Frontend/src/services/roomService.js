import api from './api';

export const getAllRooms     = ()     => api.get('/rooms');
export const createRoom     = (data) => api.post('/rooms', data);
export const allocateRoom   = (data) => api.put('/rooms/allocate', data);
export const deallocateRoom = (data) => api.put('/rooms/deallocate', data);