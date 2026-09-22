// Each handler is intentionally tiny: event routing is technical, while mapping/persistence stays in the application layer.
class ActivityEventHandler {
  constructor({ eventType, processActivityEvent }) { this.eventType = eventType; this.processActivityEvent = processActivityEvent; }
  async handle(event) { if (event.eventType !== this.eventType) throw new Error(`Expected ${this.eventType}`); return this.processActivityEvent.execute(event); }
}
export const createEventHandlers = (processActivityEvent) => new Map(['UserRegistered', 'UserLoggedIn', 'UserLoggedOut', 'PostCreated', 'PostUpdated', 'PostDeleted'].map((eventType) => [eventType, new ActivityEventHandler({ eventType, processActivityEvent })]));
