export class UserId {
  constructor(value) {
    if (!value) throw new Error('User id is required');
    this.value = String(value);
    Object.freeze(this);
  }
}
