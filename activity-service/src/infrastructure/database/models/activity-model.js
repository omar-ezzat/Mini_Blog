import mongoose from 'mongoose';
const activitySchema = new mongoose.Schema({
  _id: { type: String }, eventId: { type: String, required: true, unique: true, index: true }, eventType: { type: String, required: true, index: true },
  userId: { type: String, default: null, index: true }, action: { type: String, required: true, index: true }, resourceType: { type: String, required: true }, resourceId: { type: String, default: null }, metadata: { type: mongoose.Schema.Types.Mixed, default: {} }, occurredAt: { type: Date, required: true, index: true }
}, { timestamps: { createdAt: true, updatedAt: false }, versionKey: false });
activitySchema.index({ userId: 1, occurredAt: -1 });
activitySchema.index({ eventType: 1, occurredAt: -1 });
export const ActivityModel = mongoose.model('Activity', activitySchema);
