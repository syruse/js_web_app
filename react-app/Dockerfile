FROM node:18.0-alpine

RUN mkdir -p /project/react-app/node_modules && chown -R node:node /project/react-app

WORKDIR /project/react-app

COPY . .

COPY --chown=node:node . .

USER node

RUN yarn

RUN yarn global add serve

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "startRelease" ]
