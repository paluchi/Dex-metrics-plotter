FROM node:14

WORKDIR /service_provider

COPY package.json .
RUN npm install

COPY . .

CMD [ "npm" , "run" , "dev"]