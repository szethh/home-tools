# stage build
FROM node:18-slim as build

WORKDIR /app

# copy everything to the container
COPY . .

RUN npm i && npm run build

# stage run
FROM node:18-slim as run

WORKDIR /app

# copy dependency list
COPY --from=build /app/package*.json ./

# copy built SvelteKit app to /app
COPY --from=build /app/build ./

# clean install dependencies, no devDependencies
RUN npm i --omit=dev

ENV PORT=8080
EXPOSE 8080
CMD ["node", "./index.js"]