export const userController = ({ getCurrentUser }) => ({
  me: async (req, res, next) => {
    try {
      return res.json(await getCurrentUser.execute({ userId: req.auth.sub }));
    } catch (error) {
      return next(error);
    }
  },
});
