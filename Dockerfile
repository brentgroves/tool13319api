FROM node:14-alpine

ARG TZ='America/Indiana/Indianapolis'
ENV TZ ${TZ}

    # apk add --no-cache tzdata
RUN apk upgrade --update \
    && apk add -U tzdata \
    && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
    # && ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo "${TZ}" > /etc/timezone \
    && apk del tzdata \
    && rm -rf \
    /var/cache/apk/*

# Semantic Version: Major.Minor.Patch
# Version: 1.0.0

# https://medium.com/@marcelorlima/how-to-easily-make-your-container-waits-for-another-one-to-get-up-with-dockerize-be392e4e8e23
RUN mkdir -p /usr/src/app
RUN apk add --no-cache openssl

# Create app directory
WORKDIR /usr/src/app

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3030

# I think this cmd gets overriden by the docker compose yaml script.
CMD dockerize -wait tcp://db:3306 -wait tcp://mqtt2:1883 npm start
