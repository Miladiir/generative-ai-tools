# syntax=docker/dockerfile:1
FROM node:18@sha256:933bcfad91e9052a02bc29eb5aa29033e542afac4174f9524b79066d97b23c24 AS build


COPY . /app
WORKDIR /app
RUN <<EOF
    npm ci
    npm run build
EOF

FROM lscr.io/linuxserver/nginx:latest@sha256:922f126a4133dae8cee607e56b53ed8017da442cf677886240c1677fc644dbc4 AS host
COPY --from=build /app/dist /config/www