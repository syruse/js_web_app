FROM node:18.0-alpine

RUN mkdir -p /project/node-server/node_modules && chown -R node:node /project/node-server

WORKDIR /project/node-server

COPY . .

COPY --chown=node:node . .

USER node

RUN yarn global add nodemon ts-node typescript

#RUN yarn --production
RUN yarn install --frozen-lockfile

EXPOSE 8080

CMD [ "yarn", "start" ]
