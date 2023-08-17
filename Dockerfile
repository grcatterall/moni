FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY . .
RUN chmod u+x ./entrypoint.sh
RUN set -ex && npm i
ENTRYPOINT ["/app/entrypoint.sh"]