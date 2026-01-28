import { Router } from 'express';
import * as ctrl from '../controllers/payment.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { payment as validators } from '../validators/index.js';

const router = Router();

router.post('/create-order', authMiddleware, validateBody(validators.createOrder), ctrl.createRazorpayOrder);
router.post('/verify', authMiddleware, validateBody(validators.verify), ctrl.verify);

export default router;
