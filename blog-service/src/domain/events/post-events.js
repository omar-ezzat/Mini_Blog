import { randomUUID } from 'node:crypto';
export const postEvent = (eventType, payload) => ({ eventId: randomUUID(), eventType, occurredAt: new Date().toISOString(), source: 'blog-service', payload });
