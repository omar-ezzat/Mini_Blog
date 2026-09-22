export const authenticate = (tokenService) => (req, res, next) => {
  const token = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;
  if (!token) return res.status(401).json({ error: "Authentication required" });
  try {
    req.auth = tokenService.verifyAccessToken(token);
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired access token" });
  }
};
