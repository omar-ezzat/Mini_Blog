import { InvalidEmailError } from "../errors/domain-errors.js";

export class Email {
  constructor(value) {
    const normalized = String(value ?? "")
      .trim()
      .toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized))
      throw new InvalidEmailError();
    this.value = normalized;
    Object.freeze(this);
  }
}
