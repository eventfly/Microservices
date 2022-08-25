FROM node:alpine

# RUN apk add g++ make python
# RUN apk --no-cache add --virtual .builds-deps build-base python3


WORKDIR /app
COPY package.json .
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm install
COPY . .

CMD ["npm", "start"]