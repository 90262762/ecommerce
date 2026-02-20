import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { stripe } from '../config/stripe.js';
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

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: orderItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name, images: item.image ? [item.image] : [] },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/checkout`,
  });

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    totalPrice,
    paymentMethod: 'stripe',
    stripeSessionId: session.id,
  });

  res.status(201).json({ success: true, order, checkoutUrl: session.url });
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

export const verifyStripeSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const order = await Order.findOne({ stripeSessionId: sessionId });
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (session.payment_status === 'paid') {
    order.isPaid = true;
    order.paymentStatus = 'paid';
    order.paidAt = new Date();
    await order.save();

    await Cart.findOneAndUpdate({ user: order.user }, { $set: { items: [] } });

    await sendEmail({
      to: req.user.email,
      subject: 'Order Confirmed',
      html: `<p>Your order ${order._id} has been confirmed.</p>`,
    });
  }

  res.json({ success: true, order });
});
