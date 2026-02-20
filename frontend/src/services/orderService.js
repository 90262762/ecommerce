import { api } from './api.js';

export const orderService = {
  create: (payload) => api.post('/orders/create', payload),
  verify: (payload) => api.post('/orders/verify-payment', payload),
  myOrders: () => api.get('/orders/my-orders'),
};
