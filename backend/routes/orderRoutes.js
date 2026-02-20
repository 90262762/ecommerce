import { Router } from 'express';
import { body } from 'express-validator';
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
  verifyRazorpayPayment,
} from '../controllers/orderController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

router.use(protect);
router.post('/create', [body('shippingAddress.line1').notEmpty(), body('shippingAddress.city').notEmpty()], validate, createOrder);
router.post(
  '/verify-payment',
  [body('razorpay_order_id').notEmpty(), body('razorpay_payment_id').notEmpty(), body('razorpay_signature').notEmpty()],
  validate,
  verifyRazorpayPayment
);
router.get('/my-orders', getMyOrders);
router.get('/', adminOnly, getAllOrders);
router.patch('/:id/status', adminOnly, updateOrderStatus);

export default router;
