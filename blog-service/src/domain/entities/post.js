import { PostId } from '../value-objects/post-id.js';
import { InvalidPostDataError, UnauthorizedPostModificationError } from '../errors/post-errors.js';

const validateText = (value, field, max) => {
  const text = String(value ?? '').trim();
  if (!text) throw new InvalidPostDataError(`${field} cannot be empty`);
  if (text.length > max) throw new InvalidPostDataError(`${field} must not exceed ${max} characters`);
  return text;
};

export class Post {
  constructor({ id, authorId, title, content, createdAt = new Date(), updatedAt = new Date() }) {
    if (!authorId) throw new InvalidPostDataError('A post must have an author');
    this.id = id instanceof PostId ? id : new PostId(id);
    this.authorId = String(authorId);
    this.title = validateText(title, 'Title', 200);
    this.content = validateText(content, 'Content', 50000);
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
  static create(data) { return new Post(data); }
  update({ title, content }, actorId) {
    this.assertOwnership(actorId);
    if (title !== undefined) this.title = validateText(title, 'Title', 200);
    if (content !== undefined) this.content = validateText(content, 'Content', 50000);
    this.updatedAt = new Date();
  }
  assertOwnership(actorId) { if (this.authorId !== String(actorId)) throw new UnauthorizedPostModificationError(); }
  toJSON() { return { id: this.id.value, authorId: this.authorId, title: this.title, content: this.content, createdAt: this.createdAt, updatedAt: this.updatedAt }; }
}
