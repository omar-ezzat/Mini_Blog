// Port implemented by infrastructure; application code depends only on this contract.
export class UserRepository {
  async findByEmail(_email) {
    throw new Error("Not implemented");
  }
  async findById(_id) {
    throw new Error("Not implemented");
  }
  async save(_user) {
    throw new Error("Not implemented");
  }
}
