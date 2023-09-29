FROM node:19.5.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]
