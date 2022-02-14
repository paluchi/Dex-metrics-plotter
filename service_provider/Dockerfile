FROM node:14

WORKDIR /service_provider

COPY package.json .
RUN yarn install

COPY . .

CMD [ "npm" , "start"]