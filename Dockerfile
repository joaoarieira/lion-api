FROM node:16.13-alpine3.14
RUN apk add bash
WORKDIR /node

CMD ["npm", "install"]
RUN npm install --global jest-coverage-badges

CMD tail -f /dev/null
