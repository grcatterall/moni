#!/bin/sh

set -e

# Run database migrations
if [ -n "$DATABASE_RUN_MIGRATIONS" ] && [ "$DATABASE_RUN_MIGRATIONS" = "true" ]; then
    echo "Running database migrations."
    npm run database:migrate
fi

exec "$@"
