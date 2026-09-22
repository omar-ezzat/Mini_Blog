import { Router } from "express";
export const userRoutes = (controller, authenticate) => {
  const router = Router();
  router.get("/me", authenticate, controller.me);
  return router;
};
