import express from 'express';
import { mainController } from '../controllers/';

const router = express.Router();

router.get('/', mainController.getMain);

export default router;
