FROM node:22.16.0-alpine
WORKDIR /app
EXPOSE 3000
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

CMD ["node", "./index.js"]