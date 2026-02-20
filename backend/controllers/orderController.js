import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { razorpay } from '../config/razorpay.js';
import { sendEmail } from '../utils/sendEmail.js';

export const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress } = req.body;
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

  if (!cart || !cart.items.length) {
    res.status(400);
    throw new Error('Cart is empty');
  }

  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    image: item.product.images?.[0]?.url,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const totalPrice = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const amountInPaise = Math.round(totalPrice * 100);

  const paymentOrder = await razorpay.orders.create({
    amount: amountInPaise,
    currency: 'INR',
    receipt: `rcpt_${Date.now()}`,
  });

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    totalPrice,
    paymentMethod: 'razorpay',
    razorpayOrderId: paymentOrder.id,
  });

  res.status(201).json({
    success: true,
    order,
    razorpay: {
      key: process.env.RAZORPAY_KEY_ID,
      amount: paymentOrder.amount,
      currency: paymentOrder.currency,
      orderId: paymentOrder.id,
      name: 'ShopMERN',
      description: `Order ${order._id}`,
      prefill: {
        name: req.user.name,
        email: req.user.email,
      },
    },
  });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

export const getAllOrders = asyncHandler(async (_req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.orderStatus }, { new: true });
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json({ success: true, order });
});

export const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    res.status(400);
    throw new Error('Invalid payment signature');
  }

  const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.isPaid = true;
  order.paymentStatus = 'paid';
  order.paidAt = new Date();
  order.razorpayPaymentId = razorpay_payment_id;
  await order.save();

  await Cart.findOneAndUpdate({ user: order.user }, { $set: { items: [] } });

  await sendEmail({
    to: req.user.email,
    subject: 'Order Confirmed',
    html: `<p>Your order ${order._id} has been confirmed.</p>`,
  });

  res.json({ success: true, order });
});
