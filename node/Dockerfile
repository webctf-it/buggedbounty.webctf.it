From node:lts-alpine

# Install curl
RUN apk add --update curl && rm -f /var/cache/apk/*

# Bundle app files
COPY ./src /src/

# Workdir
WORKDIR /src

# Install
RUN npm install --production

# Expose
EXPOSE 8080

# Run
CMD [ "node", "index.js" ]
