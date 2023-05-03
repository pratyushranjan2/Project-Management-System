FROM node:lts-bullseye-slim

WORKDIR /usr/src/server
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]