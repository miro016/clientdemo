FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN npm install http-server -g
COPY --from=build /app/dist/client/browser ./


EXPOSE 80
CMD ["http-server", "-p", "80", "-d", "false"]