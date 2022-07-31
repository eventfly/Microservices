FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]