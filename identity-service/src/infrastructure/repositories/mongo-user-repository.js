import { User } from "../../domain/entities/user.js";

const toEntity = (document) =>
  document &&
  new User({
    id: document._id,
    email: document.email,
    name: document.name,
    passwordHash: document.passwordHash,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  });

export class MongoUserRepository {
  constructor({ userModel }) {
    this.userModel = userModel;
  }
  async findByEmail(email) {
    return toEntity(await this.userModel.findOne({ email }).lean());
  }
  async findById(id) {
    return toEntity(await this.userModel.findById(id).lean());
  }
  async save(user) {
    const result = await this.userModel.create({
      _id: user.id.value,
      email: user.email.value,
      name: user.name,
      passwordHash: user.passwordHash,
    });
    return toEntity(result.toObject());
  }
}
