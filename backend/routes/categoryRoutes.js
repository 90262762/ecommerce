import { Router } from 'express';
import { body } from 'express-validator';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/categoryController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

router.get('/', getCategories);
router.post('/', protect, adminOnly, [body('name').notEmpty(), body('slug').notEmpty()], validate, createCategory);
router.put('/:id', protect, adminOnly, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

export default router;
