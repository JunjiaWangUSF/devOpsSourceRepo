FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src/ .
EXPOSE 8000
CMD ["node", "app.js"]
