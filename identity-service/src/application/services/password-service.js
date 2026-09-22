export class PasswordService {
  async hash(_rawPassword) { throw new Error('Not implemented'); }
  async compare(_rawPassword, _hash) { throw new Error('Not implemented'); }
}
