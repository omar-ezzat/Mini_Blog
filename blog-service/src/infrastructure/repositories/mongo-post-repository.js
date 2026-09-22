import { Post } from '../../domain/entities/post.js';
const toEntity = (document) => document && new Post({ id: document._id, authorId: document.authorId, title: document.title, content: document.content, createdAt: document.createdAt, updatedAt: document.updatedAt });
export class MongoPostRepository {
  constructor({ postModel }) { this.postModel = postModel; }
  async save(post) { await this.postModel.findByIdAndUpdate(post.id.value, { authorId: post.authorId, title: post.title, content: post.content }, { upsert: true, new: true, setDefaultsOnInsert: true }); return post; }
  async findById(id) { return toEntity(await this.postModel.findById(id).lean()); }
  async list({ page, limit, authorId }) { const filter = authorId ? { authorId } : {}; const [documents, total] = await Promise.all([this.postModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(), this.postModel.countDocuments(filter)]); return { posts: documents.map(toEntity), total }; }
  async delete(id) { await this.postModel.deleteOne({ _id: id }); }
}
