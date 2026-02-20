import { api } from './api.js';

export const orderService = {
  create: (payload) => api.post('/orders/create', payload),
  verify: (sessionId) => api.post('/orders/verify-payment', { sessionId }),
  myOrders: () => api.get('/orders/my-orders'),
};
