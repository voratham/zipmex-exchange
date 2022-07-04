FROM node:12.16.1-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN mkdir -p ./dist
CMD npm run build
ENTRYPOINT [ "node" , "./dist/index.js" ]