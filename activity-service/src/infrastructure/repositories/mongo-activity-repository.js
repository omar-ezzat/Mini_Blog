import { Activity } from '../../domain/entities/activity.js';
const toEntity = (document) => document && new Activity({ id: document._id, eventId: document.eventId, eventType: document.eventType, userId: document.userId, action: document.action, resourceType: document.resourceType, resourceId: document.resourceId, metadata: document.metadata, occurredAt: document.occurredAt, createdAt: document.createdAt });
export class MongoActivityRepository {
  constructor({ activityModel }) { this.activityModel = activityModel; }
  async existsByEventId(eventId) { return Boolean(await this.activityModel.exists({ eventId })); }
  async saveIfNew(activity) {
    try { await this.activityModel.create({ _id: activity.id, ...activity.toJSON() }); return true; }
    catch (error) { if (error?.code === 11000) return false; throw error; }
  }
  async list({ page, limit, userId, action, eventType }) {
    const filter = Object.fromEntries(Object.entries({ userId, action, eventType }).filter(([, value]) => value));
    const [documents, total] = await Promise.all([this.activityModel.find(filter).sort({ occurredAt: -1 }).skip((page - 1) * limit).limit(limit).lean(), this.activityModel.countDocuments(filter)]);
    return { activities: documents.map(toEntity), total };
  }
}
