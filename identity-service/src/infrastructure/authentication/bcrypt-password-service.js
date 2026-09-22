import bcrypt from "bcryptjs";

export class BcryptPasswordService {
  async hash(rawPassword) {
    return bcrypt.hash(rawPassword, 12);
  }
  async compare(rawPassword, hash) {
    return bcrypt.compare(rawPassword, hash);
  }
}
