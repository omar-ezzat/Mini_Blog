import {
  validateLogin,
  validateLogout,
  validateRegistration,
} from "../validators/auth-validators.js";

const execute =
  (useCase, validator, responseHandler) => async (req, res, next) => {
    const issue = validator(req.body);

    if (issue) {
      return res.status(400).json({ error: issue });
    }

    try {
      const result = await useCase.execute(req.body);

      return responseHandler(res, result);
    } catch (error) {
      return next(error);
    }
  };

export const authController = ({ registerUser, loginUser, logoutUser }) => ({
  register: execute(registerUser, validateRegistration, (res, result) =>
    res.status(201).json(result),
  ),

  login: execute(loginUser, validateLogin, (res, result) =>
    res.status(200).json(result),
  ),

  logout: execute(logoutUser, validateLogout, (res) => res.status(204).end()),
});
