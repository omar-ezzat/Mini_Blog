import {
  InvalidCredentialsError,
  InvalidEmailError,
  InvalidNameError,
  InvalidPasswordError,
  UserAlreadyExistsError,
  UserNotFoundError,
} from "../../../domain/errors/domain-errors.js";

export const errorHandler = (error, _req, res, _next) => {
  const codes = new Map([
    [InvalidEmailError, 400],
    [InvalidNameError, 400],
    [InvalidPasswordError, 400],
    [UserAlreadyExistsError, 409],
    [InvalidCredentialsError, 401],
    [UserNotFoundError, 404],
  ]);
  const status = [...codes].find(([type]) => error instanceof type)?.[1] ?? 500;
  if (status === 500) console.error(error);
  res
    .status(status)
    .json({ error: status === 500 ? "Internal server error" : error.message });
};
