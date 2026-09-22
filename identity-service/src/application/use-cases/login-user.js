import { Email } from "../../domain/value-objects/email.js";
import { randomUUID } from "node:crypto";
import {
  InvalidCredentialsError,
  InvalidPasswordError,
} from "../../domain/errors/domain-errors.js";
import { authEvent } from "../../domain/events/auth-events.js";
import { userResponse } from "../dto/user-response.js";

export class LoginUser {
  constructor({
    userRepository,
    sessionRepository,
    passwordService,
    tokenService,
    eventPublisher,
  }) {
    Object.assign(this, {
      userRepository,
      sessionRepository,
      passwordService,
      tokenService,
      eventPublisher,
    });
  }
  async execute({ email, password }) {
    if (typeof password !== "string" || password.length < 1)
      throw new InvalidPasswordError();
    const user = await this.userRepository.findByEmail(new Email(email).value);
    if (
      !user ||
      !(await this.passwordService.compare(password, user.passwordHash))
    )
      throw new InvalidCredentialsError();
    const refreshToken = this.tokenService.createRefreshToken();
    await this.sessionRepository.save({
      id: randomUUID(),
      userId: user.id.value,
      tokenHash: this.tokenService.hashRefreshToken(refreshToken),
      expiresAt: this.tokenService.refreshExpiresAt(),
    });
    const accessToken = this.tokenService.createAccessToken(user);
    await this.eventPublisher.publish(
      authEvent("UserLoggedIn", { userId: user.id.value }),
    );
    return { user: userResponse(user), accessToken, refreshToken };
  }
}
