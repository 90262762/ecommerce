import asyncHandler from 'express-async-handler';
import cloudinary from '../config/cloudinary.js';

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image uploaded');
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'ecommerce/products',
  });

  res.status(201).json({
    success: true,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });
});
