FROM node:14

WORKDIR /dex_metrics_plot

COPY package.json .

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]