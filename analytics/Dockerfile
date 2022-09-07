FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y --force-yes --no-install-recommends\
    apt-transport-https \
    build-essential \
    curl \
    ca-certificates



RUN curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh
RUN apt install nodejs -y


RUN apt install python3.8 -y
RUN apt-get -y install python3-pip


WORKDIR /app
COPY package.json .
COPY requirements.txt ./

RUN pip3 install --no-cache-dir -r requirements.txt

RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm install
COPY . .

CMD ["npm", "start"]