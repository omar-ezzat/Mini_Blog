import { InvalidPostDataError, PostNotFoundError, UnauthorizedPostModificationError } from '../../../domain/errors/post-errors.js';
export const errorHandler = (error, _req, res, _next) => {
  const status = error instanceof InvalidPostDataError ? 400 : error instanceof PostNotFoundError ? 404 : error instanceof UnauthorizedPostModificationError ? 403 : 500;
  if (status === 500) console.error(error);
  res.status(status).json({ error: status === 500 ? 'Internal server error' : error.message });
};
