FROM node:14

WORKDIR /metrics_plotter

COPY package.json .

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]