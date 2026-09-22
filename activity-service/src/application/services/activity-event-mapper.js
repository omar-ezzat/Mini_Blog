import { Activity } from '../../domain/entities/activity.js';
import { InvalidActivityEventError, UnsupportedActivityEventError } from '../../domain/errors/activity-errors.js';
import { randomUUID } from 'node:crypto';

const mappings = {
  UserRegistered: (payload) => ({ userId: payload.user?.id, action: 'registered', resourceType: 'user', resourceId: payload.user?.id, metadata: { email: payload.user?.email, name: payload.user?.name } }),
  UserLoggedIn: (payload) => ({ userId: payload.userId, action: 'logged_in', resourceType: 'session', resourceId: null, metadata: {} }),
  UserLoggedOut: (payload) => ({ userId: payload.userId, action: 'logged_out', resourceType: 'session', resourceId: null, metadata: {} }),
  PostCreated: (payload) => ({ userId: payload.authorId, action: 'created', resourceType: 'post', resourceId: payload.postId, metadata: { title: payload.title } }),
  PostUpdated: (payload) => ({ userId: payload.authorId, action: 'updated', resourceType: 'post', resourceId: payload.postId, metadata: { title: payload.title } }),
  PostDeleted: (payload) => ({ userId: payload.authorId, action: 'deleted', resourceType: 'post', resourceId: payload.postId, metadata: { title: payload.title } })
};
export class ActivityEventMapper {
  map(event) {
    if (!event || typeof event !== 'object' || !event.eventId || !event.eventType || !event.occurredAt || !event.payload || typeof event.payload !== 'object') throw new InvalidActivityEventError('Event envelope is malformed');
    const mapper = mappings[event.eventType]; if (!mapper) throw new UnsupportedActivityEventError(event.eventType);
    return new Activity({ id: randomUUID(), eventId: event.eventId, eventType: event.eventType, occurredAt: event.occurredAt, ...mapper(event.payload) });
  }
}
