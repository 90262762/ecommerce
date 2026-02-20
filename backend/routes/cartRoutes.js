import { Router } from 'express';
import { body } from 'express-validator';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

router.use(protect);
router.get('/', getCart);
router.post('/', [body('productId').notEmpty(), body('quantity').isInt({ min: 1 })], validate, addToCart);
router.delete('/:productId', removeFromCart);

export default router;
