import { Kafka } from 'kafkajs';
export class KafkaActivityConsumer {
  constructor({ brokers, clientId, groupId, topics, handlers }) { this.consumer = new Kafka({ clientId, brokers }).consumer({ groupId }); this.topics = topics; this.handlers = handlers; }
  async start() {
    await this.consumer.connect();
    for (const topic of this.topics) await this.consumer.subscribe({ topic, fromBeginning: false });
    await this.consumer.run({ eachMessage: async ({ topic, partition, message }) => {
      try {
        const event = JSON.parse(message.value.toString()); const handler = this.handlers.get(event.eventType);
        if (!handler) return console.warn(`Skipping unsupported event type ${event.eventType}`);
        const result = await handler.handle(event); if (!result.processed) console.info(`Skipped duplicate event ${event.eventId}`);
      } catch (error) { console.error(`Unable to process Kafka message from ${topic}[${partition}]`, error.message); }
    } });
  }
  async disconnect() { await this.consumer.disconnect(); }
}
