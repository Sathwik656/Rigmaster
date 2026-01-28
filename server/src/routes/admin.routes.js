import { Router } from 'express';
import * as ctrl from '../controllers/admin.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireAdmin } from '../middlewares/role.middleware.js';
import { validateQuery } from '../middlewares/validate.middleware.js';
import { admin as validators } from '../validators/index.js';

const router = Router();

router.use(authMiddleware, requireAdmin);

router.get('/dashboard', ctrl.dashboardSummary);
router.get('/analytics/sales', validateQuery(validators.analyticsQuery), ctrl.salesAnalytics);
router.get('/analytics/revenue-by-day', validateQuery(validators.analyticsQuery), ctrl.revenueByDay);
router.get('/analytics/product-performance', validateQuery(validators.productPerformanceQuery), ctrl.productPerformance);
router.get('/stock-alerts', validateQuery(validators.stockAlertsQuery), ctrl.stockAlerts);

export default router;
