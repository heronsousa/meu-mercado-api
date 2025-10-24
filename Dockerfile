FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENTRYPOINT ["npm"]
CMD ["run", "dev"]

EXPOSE 3000