import { Router } from 'express';
import { body } from 'express-validator';
import {
  addReview,
  createProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.post(
  '/',
  protect,
  adminOnly,
  [body('name').notEmpty(), body('slug').notEmpty(), body('price').isFloat({ min: 0 })],
  validate,
  createProduct
);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.post('/:id/reviews', protect, [body('rating').isInt({ min: 1, max: 5 }), body('comment').notEmpty()], validate, addReview);

export default router;
