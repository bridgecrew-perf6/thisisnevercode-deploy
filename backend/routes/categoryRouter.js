import express from 'express';
import { categoryController } from '../controllers';

const router = express.Router();
router.get('/', categoryController.mainCategory);

export default router;
