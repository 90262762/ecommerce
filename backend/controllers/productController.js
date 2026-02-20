import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import { APIFeatures } from '../utils/apiFeatures.js';

/**
 * @desc List products with pagination, filter and search
 * @route GET /api/products
 */
export const getProducts = asyncHandler(async (req, res) => {
  const resultPerPage = Number(req.query.limit) || 8;
  const productCount = await Product.countDocuments();

  const features = new APIFeatures(Product.find().populate('category'), req.query).search().filter().paginate(resultPerPage);
  const products = await features.query;

  res.json({ success: true, productCount, resultPerPage, products });
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate('category reviews.user', 'name');
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, product });
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, message: 'Product deleted' });
});

export const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const existingReview = product.reviews.find((r) => r.user.toString() === req.user._id.toString());

  if (existingReview) {
    existingReview.rating = Number(rating);
    existingReview.comment = comment;
  } else {
    product.reviews.push({ user: req.user._id, rating: Number(rating), comment });
  }

  product.ratingsCount = product.reviews.length;
  product.ratingsAverage = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

  await product.save();
  res.status(201).json({ success: true, message: 'Review submitted' });
});
