import { Router } from 'express';
import * as ctrl from '../controllers/cart.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateBody, validateParams } from '../middlewares/validate.middleware.js';
import Joi from 'joi';

const router = Router();

const addItemSchema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).default(1),
});

const updateItemSchema = Joi.object({
    quantity: Joi.number().required(),
});

const productIdParam = Joi.object({
    productId: Joi.string().required(),
});

router.use(authMiddleware);

router.get('/', ctrl.getCart);
router.post('/', validateBody(addItemSchema), ctrl.addItem);
router.patch('/:productId', validateParams(productIdParam), validateBody(updateItemSchema), ctrl.updateItem);
router.delete('/:productId', validateParams(productIdParam), ctrl.removeItem);
router.delete('/', ctrl.clearCart);

export default router;
