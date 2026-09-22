export class SessionRepository {
  async save(_session) {
    throw new Error("Not implemented");
  }
  async revokeByTokenHash(_tokenHash) {
    throw new Error("Not implemented");
  }
}
