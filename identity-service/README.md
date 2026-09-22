# Identity Service

The Identity Service owns MiniBlog user identity, credentials, sessions, JWTs, and authentication integration events. It deliberately does not contain blog or activity behavior.

## Run locally

1. Copy `.env.example` to `.env` and set a strong `JWT_SECRET`.
2. Ensure MongoDB and Kafka are available at the configured addresses.
3. Run `npm install`.
4. Run `npm run dev`.

The API is served on `http://localhost:3001` by default.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/auth/register` | Register a user |
| POST | `/auth/login` | Log in and create a session |
| POST | `/auth/logout` | Revoke the supplied refresh-token session |
| GET | `/users/me` | Read the access-token user |

Registration body: `{ "email": "ada@example.com", "name": "Ada", "password": "at-least-8-chars" }`.
Login body: `{ "email": "ada@example.com", "password": "at-least-8-chars" }`.
Logout body: `{ "refreshToken": "..." }`. `/users/me` expects `Authorization: Bearer <access token>`.

Kafka publishes `UserRegistered`, `UserLoggedIn`, and `UserLoggedOut` to `KAFKA_TOPIC`, using a consistent integration-event envelope.
