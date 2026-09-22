import { Router } from 'express';
export const activityRoutes = (controller) => { const router = Router(); router.get('/', controller.list); return router; };
