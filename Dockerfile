FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig*.json ./
RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn","dev"]