import 'dotenv/config';
import express from 'express';
import { connectMongo } from './infrastructure/database/mongo-connection.js';
import { PostModel } from './infrastructure/database/models/post-model.js';
import { MongoPostRepository } from './infrastructure/repositories/mongo-post-repository.js';
import { JwtTokenVerifier } from './infrastructure/authentication/jwt-token-verifier.js';
import { KafkaEventPublisher } from './infrastructure/messaging/kafka-event-publisher.js';
import { CreatePost } from './application/use-cases/create-post.js';
import { GetPost } from './application/use-cases/get-post.js';
import { ListPosts } from './application/use-cases/list-posts.js';
import { UpdatePost } from './application/use-cases/update-post.js';
import { DeletePost } from './application/use-cases/delete-post.js';
import { postController } from './interfaces/http/controllers/post-controller.js';
import { postRoutes } from './interfaces/http/routes/post-routes.js';
import { authenticate } from './interfaces/http/middleware/authenticate.js';
import { errorHandler } from './interfaces/http/middleware/error-handler.js';

for (const name of ['MONGODB_URI', 'JWT_SECRET', 'KAFKA_BROKERS', 'KAFKA_CLIENT_ID', 'KAFKA_TOPIC']) if (!process.env[name]) throw new Error(`Missing required environment variable: ${name}`);
const postRepository = new MongoPostRepository({ postModel: PostModel });
const eventPublisher = new KafkaEventPublisher({ brokers: process.env.KAFKA_BROKERS.split(','), clientId: process.env.KAFKA_CLIENT_ID, topic: process.env.KAFKA_TOPIC });
const dependencies = { postRepository, eventPublisher };
const controller = postController({ createPost: new CreatePost(dependencies), getPost: new GetPost(dependencies), listPosts: new ListPosts(dependencies), updatePost: new UpdatePost(dependencies), deletePost: new DeletePost(dependencies) });
const app = express(); app.use(express.json()); app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'blog-service' })); app.use('/posts', postRoutes(controller, authenticate(new JwtTokenVerifier({ secret: process.env.JWT_SECRET })))); app.use(errorHandler);
async function start() { await connectMongo(process.env.MONGODB_URI); await eventPublisher.connect(); const server = app.listen(process.env.PORT ?? 3002, () => console.log(`Blog Service listening on port ${process.env.PORT ?? 3002}`)); const stop = async () => { server.close(); await eventPublisher.disconnect(); process.exit(0); }; process.on('SIGINT', stop); process.on('SIGTERM', stop); }
start().catch((error) => { console.error('Blog Service failed to start', error); process.exit(1); });
