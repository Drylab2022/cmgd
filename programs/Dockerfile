FROM node:lts-alpine
LABEL maintainer="Quan.Wan@drylab.tech"

# Dependencies
RUN apk update && \
      apk upgrade && \
      apk add curl 

ENV NODE_ENV production
WORKDIR /usr/src/app

# Ensure we get package-lock.json and take advantage of cache
COPY package*.json ./

# https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable
RUN npm ci --only=production

COPY . .

RUN mkdir /usr/cmgd && touch /usr/cmgd/readme

EXPOSE 80
CMD [ "node", "index.js" ]
