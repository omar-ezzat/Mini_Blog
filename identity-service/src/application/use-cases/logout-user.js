import { authEvent } from "../../domain/events/auth-events.js";
import { InvalidCredentialsError } from "../../domain/errors/domain-errors.js";

export class LogoutUser {
  constructor({ sessionRepository, tokenService, eventPublisher }) {
    Object.assign(this, { sessionRepository, tokenService, eventPublisher });
  }
  async execute({ refreshToken }) {
    if (typeof refreshToken !== "string" || !refreshToken)
      throw new InvalidCredentialsError();
    const session = await this.sessionRepository.revokeByTokenHash(
      this.tokenService.hashRefreshToken(refreshToken),
    );
    await this.eventPublisher.publish(
      authEvent("UserLoggedOut", { userId: session?.userId ?? null }),
    );
  }
}
