export class InvalidActivityEventError extends Error {
  constructor(message = "Invalid activity event") {
    super(message);
    this.name = "InvalidActivityEventError";
  }
}
export class UnsupportedActivityEventError extends Error {
  constructor(type) {
    super(`Unsupported event type: ${type}`);
    this.name = "UnsupportedActivityEventError";
  }
}
