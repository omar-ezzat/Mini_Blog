import { Router } from "express";
export const authRoutes = (controller) => {
  const router = Router();
  router.post("/register", controller.register);
  router.post("/login", controller.login);
  router.post("/logout", controller.logout);
  return router;
};
