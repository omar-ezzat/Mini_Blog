import { randomUUID } from "node:crypto";
import { User } from "../../domain/entities/user.js";
import { Email } from "../../domain/value-objects/email.js";
import {
  InvalidPasswordError,
  UserAlreadyExistsError,
} from "../../domain/errors/domain-errors.js";
import { authEvent } from "../../domain/events/auth-events.js";
import { userResponse } from "../dto/user-response.js";

export class RegisterUser {
  constructor({ userRepository, passwordService, eventPublisher }) {
    Object.assign(this, { userRepository, passwordService, eventPublisher });
  }
  async execute({ email, name, password }) {
    if (typeof password !== "string" || password.length < 8)
      throw new InvalidPasswordError();
    const emailVO = new Email(email);
    if (await this.userRepository.findByEmail(emailVO.value))
      throw new UserAlreadyExistsError();
    const user = User.create({
      id: randomUUID(),
      email: emailVO,
      name,
      passwordHash: await this.passwordService.hash(password),
    });
    await this.userRepository.save(user);
    await this.eventPublisher.publish(
      authEvent("UserRegistered", { user: userResponse(user) }),
    );
    return userResponse(user);
  }
}
