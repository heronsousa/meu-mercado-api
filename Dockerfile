FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

ENTRYPOINT ["npm"]
CMD ["run", "dev"]

EXPOSE 3000