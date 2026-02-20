import { Router } from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = Router();
const upload = multer({ dest: 'tmp/' });

router.post('/', protect, adminOnly, upload.single('image'), uploadImage);

export default router;
