# Blog Service

The Blog Service owns post content only. It validates Identity Service JWTs locally using the shared signing secret, never reads the Identity database, and publishes post integration events through Kafka.

Run `npm install`, copy `.env.example` to `.env`, ensure MongoDB and Kafka are running, then use `npm run dev`.

Endpoints: `POST /posts`, `GET /posts?page=1&limit=10&authorId=...`, `GET /posts/:id`, `PATCH /posts/:id`, `DELETE /posts/:id`. Mutations require `Authorization: Bearer <identity access token>`.
