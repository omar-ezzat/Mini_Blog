import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({ _id: { type: String }, authorId: { type: String, required: true, index: true }, title: { type: String, required: true }, content: { type: String, required: true } }, { timestamps: true, versionKey: false });
postSchema.index({ createdAt: -1 });
postSchema.index({ authorId: 1, createdAt: -1 });
export const PostModel = mongoose.model('BlogPost', postSchema);
