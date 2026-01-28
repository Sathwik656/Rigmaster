import { Router } from 'express';
import * as ctrl from '../controllers/product.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireAdmin } from '../middlewares/role.middleware.js';
import { validateBody, validateQuery, validateParams } from '../middlewares/validate.middleware.js';
import { product as validators } from '../validators/index.js';

const router = Router();

router.get('/', validateQuery(validators.listQuery), ctrl.list);
router.get('/id/:id', validateParams(validators.idParam), ctrl.getById);
router.get('/sku/:sku', validateParams(validators.skuParam), ctrl.getBySku);

router.post('/', authMiddleware, requireAdmin, validateBody(validators.create), ctrl.create);
router.patch('/:id', authMiddleware, requireAdmin, validateParams(validators.idParam), validateBody(validators.update), ctrl.update);
router.delete('/:id', authMiddleware, requireAdmin, validateParams(validators.idParam), ctrl.deactivate);

export default router;
