FROM node:20-bookworm-slim as build

RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev

WORKDIR /app
COPY . .

RUN npm ci && npm rebuild canvas

CMD ["npm", "start"]

