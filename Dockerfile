FROM node:12.13.1-alpine

RUN rm -rf /var/lib/apt/lists/* && apk update
RUN apk add bash vim git busybox-extras python
RUN npm install -g nodemon pm2 yarn

RUN mkdir -p /app
WORKDIR /app

# Copy app files into app folder
COPY . /app
RUN yarn \
    && ls -la /app
VOLUME /app

# Clear old entrypoint
RUN rm -rf /usr/local/bin/docker-entrypoint.sh
COPY docker-entrypoint.sh /usr/local/bin/
RUN sed -i -e 's/\r$//' /usr/local/bin/docker-entrypoint.sh \
    && chmod +x /usr/local/bin/docker-entrypoint.sh && ln -s /usr/local/bin/docker-entrypoint.sh /
ENTRYPOINT ["docker-entrypoint.sh"]
