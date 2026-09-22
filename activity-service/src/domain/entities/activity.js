import { InvalidActivityEventError } from "../errors/activity-errors.js";
export class Activity {
  constructor({
    id,
    eventId,
    eventType,
    userId = null,
    action,
    resourceType,
    resourceId = null,
    metadata = {},
    occurredAt,
    createdAt = new Date(),
  }) {
    if (
      !id ||
      !eventId ||
      !eventType ||
      !action ||
      !resourceType ||
      !occurredAt
    )
      throw new InvalidActivityEventError(
        "Activity is missing required fields",
      );
    if (Number.isNaN(new Date(occurredAt).getTime()))
      throw new InvalidActivityEventError(
        "Event has an invalid occurredAt timestamp",
      );
    this.id = String(id);
    this.eventId = String(eventId);
    this.eventType = String(eventType);
    this.userId = userId ? String(userId) : null;
    this.action = String(action);
    this.resourceType = String(resourceType);
    this.resourceId = resourceId ? String(resourceId) : null;
    this.metadata = metadata;
    this.occurredAt = new Date(occurredAt);
    this.createdAt = new Date(createdAt);
  }
  toJSON() {
    return {
      id: this.id,
      eventId: this.eventId,
      eventType: this.eventType,
      userId: this.userId,
      action: this.action,
      resourceType: this.resourceType,
      resourceId: this.resourceId,
      metadata: this.metadata,
      occurredAt: this.occurredAt,
      createdAt: this.createdAt,
    };
  }
}
