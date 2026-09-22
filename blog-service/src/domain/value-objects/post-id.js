export class PostId {
  constructor(value) { if (!value) throw new Error('Post id is required'); this.value = String(value); Object.freeze(this); }
}
