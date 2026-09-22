import { Kafka } from "kafkajs";

export class KafkaEventPublisher {
  constructor({ brokers, clientId, topic }) {
    this.topic = topic;
    this.producer = new Kafka({ clientId, brokers }).producer();
  }
  async connect() {
    await this.producer.connect();
  }
  async publish(event) {
    await this.producer.send({
      topic: this.topic,
      messages: [
        {
          key: event.payload.userId ?? event.payload.user?.id ?? event.eventId,
          value: JSON.stringify(event),
        },
      ],
    });
  }
  async disconnect() {
    await this.producer.disconnect();
  }
}
