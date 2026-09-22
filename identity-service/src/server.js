import "dotenv/config";
import express from "express";
import { connectMongo } from "./infrastructure/database/mongo-connection.js";
import { UserModel } from "./infrastructure/database/models/user-model.js";
import { SessionModel } from "./infrastructure/database/models/session-model.js";
import { MongoUserRepository } from "./infrastructure/repositories/mongo-user-repository.js";
import { MongoSessionRepository } from "./infrastructure/repositories/mongo-session-repository.js";
import { BcryptPasswordService } from "./infrastructure/authentication/bcrypt-password-service.js";
import { JwtTokenService } from "./infrastructure/authentication/jwt-token-service.js";
import { KafkaEventPublisher } from "./infrastructure/messaging/kafka-event-publisher.js";
import { RegisterUser } from "./application/use-cases/register-user.js";
import { LoginUser } from "./application/use-cases/login-user.js";
import { LogoutUser } from "./application/use-cases/logout-user.js";
import { GetCurrentUser } from "./application/use-cases/get-current-user.js";
import { authController } from "./interfaces/http/controllers/auth-controller.js";
import { userController } from "./interfaces/http/controllers/user-controller.js";
import { authRoutes } from "./interfaces/http/routes/auth-routes.js";
import { userRoutes } from "./interfaces/http/routes/user-routes.js";
import { authenticate } from "./interfaces/http/middleware/authenticate.js";
import { errorHandler } from "./interfaces/http/middleware/error-handler.js";

const required = [
  "MONGODB_URI",
  "JWT_SECRET",
  "KAFKA_BROKERS",
  "KAFKA_CLIENT_ID",
  "KAFKA_TOPIC",
];
for (const key of required)
  if (!process.env[key])
    throw new Error(`Missing required environment variable: ${key}`);
const userRepository = new MongoUserRepository({ userModel: UserModel });
const sessionRepository = new MongoSessionRepository({
  sessionModel: SessionModel,
});
const passwordService = new BcryptPasswordService();
const tokenService = new JwtTokenService({
  secret: process.env.JWT_SECRET,
  accessExpiresIn: process.env.JWT_EXPIRES_IN ?? "15m",
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d",
});
const eventPublisher = new KafkaEventPublisher({
  brokers: process.env.KAFKA_BROKERS.split(","),
  clientId: process.env.KAFKA_CLIENT_ID,
  topic: process.env.KAFKA_TOPIC,
});
const dependencies = {
  userRepository,
  sessionRepository,
  passwordService,
  tokenService,
  eventPublisher,
};
const auth = authController({
  registerUser: new RegisterUser(dependencies),
  loginUser: new LoginUser(dependencies),
  logoutUser: new LogoutUser(dependencies),
});
const users = userController({
  getCurrentUser: new GetCurrentUser(dependencies),
});
const app = express();
app.use(express.json());
app.get("/health", (_req, res) =>
  res.json({ status: "ok", service: "identity-service" }),
);
app.use("/auth", authRoutes(auth));
app.use("/users", userRoutes(users, authenticate(tokenService)));
app.use(errorHandler);

async function start() {
  await connectMongo(process.env.MONGODB_URI);
  await eventPublisher.connect();
  const server = app.listen(process.env.PORT ?? 3001, () =>
    console.log(
      `Identity Service listening on port ${process.env.PORT ?? 3001}`,
    ),
  );
  const stop = async () => {
    server.close();
    await eventPublisher.disconnect();
    process.exit(0);
  };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
}
start().catch((error) => {
  console.error("Identity Service failed to start", error);
  process.exit(1);
});
