import crypto from "node:crypto";
import jwt from "jsonwebtoken";

export class JwtTokenService {
  constructor({ secret, accessExpiresIn, refreshExpiresIn }) {
    Object.assign(this, { secret, accessExpiresIn, refreshExpiresIn });
  }
  createAccessToken(user) {
    return jwt.sign(
      { sub: user.id.value, email: user.email.value },
      this.secret,
      { expiresIn: this.accessExpiresIn },
    );
  }
  createRefreshToken() {
    return crypto.randomBytes(48).toString("base64url");
  }
  hashRefreshToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }
  refreshExpiresAt() {
    const match = /^(\d+)([smhd])$/.exec(this.refreshExpiresIn);
    const unit = { s: 1000, m: 60000, h: 3600000, d: 86400000 }[match?.[2]];
    return new Date(Date.now() + Number(match?.[1] ?? 7) * (unit ?? 86400000));
  }
  verifyAccessToken(token) {
    return jwt.verify(token, this.secret);
  }
}
