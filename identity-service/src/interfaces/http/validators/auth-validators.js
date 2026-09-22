export const validateRegistration = (body) =>
  validate(body, ["email", "name", "password"], { password: 8 });
export const validateLogin = (body) =>
  validate(body, ["email", "password"], { password: 1 });
export const validateLogout = (body) =>
  validate(body, ["refreshToken"], { refreshToken: 1 });

function validate(body, required, minimums) {
  if (!body || typeof body !== "object")
    return "A JSON request body is required";
  for (const field of required)
    if (
      typeof body[field] !== "string" ||
      !body[field].trim() ||
      (minimums[field] && body[field].length < minimums[field])
    )
      return `Invalid ${field}`;
  return null;
}
