FROM node:18

# Create app directory
WORKDIR /app
RUN apt-get update && apt-get install -y openssl libssl-dev
COPY . .
RUN set -ex && npm i
ENTRYPOINT ["/app/entrypoint.sh"]