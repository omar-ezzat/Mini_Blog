import { Router } from 'express';
export const postRoutes = (controller, authenticate) => { const router = Router(); router.get('/', controller.list); router.get('/:id', controller.get); router.post('/', authenticate, controller.create); router.patch('/:id', authenticate, controller.update); router.delete('/:id', authenticate, controller.delete); return router; };
