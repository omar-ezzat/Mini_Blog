import { activityResponse } from '../dto/activity-response.js';
export class GetActivities {
  constructor({ activityRepository }) { this.activityRepository = activityRepository; }
  async execute({ page = 1, limit = 20, userId, action, eventType } = {}) {
    const safePage = Math.max(1, Number(page) || 1); const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
    const result = await this.activityRepository.list({ page: safePage, limit: safeLimit, userId, action, eventType });
    return { data: result.activities.map(activityResponse), pagination: { page: safePage, limit: safeLimit, total: result.total, totalPages: Math.ceil(result.total / safeLimit) } };
  }
}
