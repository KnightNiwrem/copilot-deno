# Copilot Instructions for copilot-deno Project

This document provides guidelines for GitHub Copilot when suggesting code for this project.

## Project Architecture

- This is a [Deno](https://deno.land/) project
- This project is dockerized

## Database Guidelines

### PostgreSQL

If PostgreSQL is required for the project:

- Docker-compose should use PostgreSQL v17 image
- Use the following packages for database interactions:
  - `npm:kysely` for query building
  - `npm:pg` for PostgreSQL client

Example Docker Compose configuration for PostgreSQL:

```yaml
services:
  postgres:
    image: postgres:17
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_USER: user
      POSTGRES_DB: database
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

### Redis

If Redis is required for the project:

- Docker-compose should use Redis v8 image
- Use the following packages for Redis interactions:
  - `npm:bullmq` for job queue management
  - `npm:ioredis` for Redis client

Example Docker Compose configuration for Redis:

```yaml
services:
  redis:
    image: redis:8
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

volumes:
  redis-data:
```

## Telegram Bot Development

If developing a Telegram bot:

- Use `grammy` and related plugins imported from `lib.deno.dev`
- The lib.deno.dev import URL structure mirrors that of deno.land/x
- For example, if the deno.land import URL is https://deno.land/x/grammy@v1.36.3, then the lib.deno.dev version would be https://lib.deno.dev/x/grammy@v1.36.3
- **Important**: Do NOT use grammy sessions

Example import:

```typescript
import { Bot } from "https://lib.deno.dev/x/grammy/mod.ts";
```

## Deno Standard Libraries

For Deno standard libraries:

- Use the "jsr:" prefix for importing standard libraries
- This is the recommended way to import Deno standard libraries in new projects

Example import:

```typescript
import * as assert from "jsr:@std/assert";
```