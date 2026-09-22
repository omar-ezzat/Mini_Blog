import 'dotenv/config';
import express from 'express';
import { connectMongo } from './infrastructure/database/mongo-connection.js';
import { ActivityModel } from './infrastructure/database/models/activity-model.js';
import { MongoActivityRepository } from './infrastructure/repositories/mongo-activity-repository.js';
import { KafkaActivityConsumer } from './infrastructure/messaging/kafka-activity-consumer.js';
import { createEventHandlers } from './infrastructure/messaging/event-handlers.js';
import { ActivityEventMapper } from './application/services/activity-event-mapper.js';
import { ProcessActivityEvent } from './application/use-cases/process-activity-event.js';
import { GetActivities } from './application/use-cases/get-activities.js';
import { activityController } from './interfaces/http/controllers/activity-controller.js';
import { activityRoutes } from './interfaces/http/routes/activity-routes.js';
import { errorHandler } from './interfaces/http/middleware/error-handler.js';

for (const name of ['MONGODB_URI', 'KAFKA_BROKERS', 'KAFKA_CLIENT_ID', 'KAFKA_GROUP_ID', 'KAFKA_TOPIC']) if (!process.env[name]) throw new Error(`Missing required environment variable: ${name}`);
const activityRepository = new MongoActivityRepository({ activityModel: ActivityModel });
const processActivityEvent = new ProcessActivityEvent({ activityRepository, eventMapper: new ActivityEventMapper() });
const consumer = new KafkaActivityConsumer({ brokers: process.env.KAFKA_BROKERS.split(','), clientId: process.env.KAFKA_CLIENT_ID, groupId: process.env.KAFKA_GROUP_ID, topics: process.env.KAFKA_TOPIC.split(',').map((topic) => topic.trim()).filter(Boolean), handlers: createEventHandlers(processActivityEvent) });
const app = express(); app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'activity-service' })); app.use('/activities', activityRoutes(activityController({ getActivities: new GetActivities({ activityRepository }) }))); app.use(errorHandler);
async function start() { await connectMongo(process.env.MONGODB_URI); await consumer.start(); const server = app.listen(process.env.PORT ?? 3003, () => console.log(`Activity Service listening on port ${process.env.PORT ?? 3003}`)); const stop = async () => { server.close(); await consumer.disconnect(); process.exit(0); }; process.on('SIGINT', stop); process.on('SIGTERM', stop); }
start().catch((error) => { console.error('Activity Service failed to start', error); process.exit(1); });
