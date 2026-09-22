# Activity Service

The Activity Service consumes Identity and Blog integration events and exposes eventually consistent activity history at `GET /activities`.

Set `KAFKA_TOPIC` to the comma-separated topics published by the other services (or configure every service with one shared topic), then run `npm install` and `npm run dev`.

`GET /activities?page=1&limit=20&userId=...&action=...&eventType=...` returns a paginated result. Activities use a unique `eventId` index; repeated Kafka deliveries are ignored safely, including concurrent races.

It never calls another service or accesses another service's database: the integration-event envelope contains all information required for the activity projection.
