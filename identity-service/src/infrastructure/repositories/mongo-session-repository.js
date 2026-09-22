export class MongoSessionRepository {
  constructor({ sessionModel }) {
    this.sessionModel = sessionModel;
  }
  async save(session) {
    await this.sessionModel.create({ _id: session.id, ...session });
  }
  async revokeByTokenHash(tokenHash) {
    return this.sessionModel
      .findOneAndUpdate(
        { tokenHash, revokedAt: null },
        { $set: { revokedAt: new Date() } },
        { new: true },
      )
      .lean();
  }
}
