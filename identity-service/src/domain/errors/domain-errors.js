export class InvalidEmailError extends Error {
  constructor() {
    super("Email address is invalid");
    this.name = "InvalidEmailError";
  }
}
export class InvalidNameError extends Error {
  constructor() {
    super("Name must be between 2 and 100 characters");
    this.name = "InvalidNameError";
  }
}
export class InvalidPasswordError extends Error {
  constructor() {
    super("Password must be at least 8 characters");
    this.name = "InvalidPasswordError";
  }
}
export class UserAlreadyExistsError extends Error {
  constructor() {
    super("A user with this email already exists");
    this.name = "UserAlreadyExistsError";
  }
}
export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid email or password");
    this.name = "InvalidCredentialsError";
  }
}
export class UserNotFoundError extends Error {
  constructor() {
    super("User was not found");
    this.name = "UserNotFoundError";
  }
}
