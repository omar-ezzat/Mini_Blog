import { Email } from "../value-objects/email.js";
import { UserId } from "../value-objects/user-id.js";
import { InvalidNameError } from "../errors/domain-errors.js";

export class User {
  constructor({
    id,
    email,
    name,
    passwordHash,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    if (!passwordHash || typeof passwordHash !== "string")
      throw new Error("A password hash is required");
    const cleanName = String(name ?? "").trim();
    if (cleanName.length < 2 || cleanName.length > 100)
      throw new InvalidNameError();
    this.id = id instanceof UserId ? id : new UserId(id);
    this.email = email instanceof Email ? email : new Email(email);
    this.name = cleanName;
    this.passwordHash = passwordHash;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }

  static create(props) {
    return new User(props);
  }

  toPublic() {
    return {
      id: this.id.value,
      email: this.email.value,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
