# syntax=docker/dockerfile:1
FROM node:18 AS build


COPY . /app
WORKDIR /app
RUN <<EOF
    npm ci
    npm run build
EOF

FROM lscr.io/linuxserver/nginx:latest AS host
COPY --from=build /app/dist /config/www