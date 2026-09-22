import { UserNotFoundError } from "../../domain/errors/domain-errors.js";
import { userResponse } from "../dto/user-response.js";

export class GetCurrentUser {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }
  async execute({ userId }) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFoundError();
    return userResponse(user);
  }
}
