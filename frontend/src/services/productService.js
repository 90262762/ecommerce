import { api } from './api.js';

export const productService = {
  list: (params) => api.get('/products', { params }),
  details: (slug) => api.get(`/products/${slug}`),
};
