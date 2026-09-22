import { randomUUID } from "node:crypto";

export const authEvent = (eventType, payload) => ({
  eventId: randomUUID(),
  eventType,
  occurredAt: new Date().toISOString(),
  source: "identity-service",
  payload,
});
