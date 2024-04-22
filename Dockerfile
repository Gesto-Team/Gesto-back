FROM node:18 as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18 as production

COPY --from=builder /usr/src/app/ ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

