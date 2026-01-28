import { Router } from 'express';
import * as ctrl from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { auth as validators } from '../validators/index.js';

const router = Router();

router.post('/register', validateBody(validators.register), ctrl.register);
router.post('/login', validateBody(validators.login), ctrl.login);
router.post('/refresh', validateBody(validators.refresh), ctrl.refresh);
router.post('/logout', authMiddleware, ctrl.logout);
router.get('/profile', authMiddleware, ctrl.getProfile);

export default router;
