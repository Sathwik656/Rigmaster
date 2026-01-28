import { Router } from 'express';
import * as ctrl from '../controllers/order.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateBody, validateQuery, validateParams } from '../middlewares/validate.middleware.js';
import { order as validators } from '../validators/index.js';

const router = Router();

router.use(authMiddleware);

router.post('/', validateBody(validators.create), ctrl.create);
router.get('/', validateQuery(validators.listQuery), ctrl.listMine);
router.get('/:id', validateParams(validators.idParam), ctrl.getById);
router.post('/:id/cancel', validateParams(validators.idParam), ctrl.cancel);

export default router;
