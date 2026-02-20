import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';

export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  res.json({ success: true, cart: cart || { items: [] } });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [{ product: productId, quantity }] });
  } else {
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
  }

  res.status(201).json({ success: true, cart });
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId);
  await cart.save();

  res.json({ success: true, cart });
});
