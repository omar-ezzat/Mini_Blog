export class ProcessActivityEvent {
  constructor({ activityRepository, eventMapper }) { Object.assign(this, { activityRepository, eventMapper }); }
  async execute(event) {
    const activity = this.eventMapper.map(event);
    if (await this.activityRepository.existsByEventId(activity.eventId)) return { processed: false, reason: 'duplicate' };
    const saved = await this.activityRepository.saveIfNew(activity);
    return { processed: saved, reason: saved ? null : 'duplicate' };
  }
}
