FROM node:18.0-alpine

RUN mkdir -p /project/node-server/node_modules

RUN mkdir -p /project/node-server/build && chown -R node:node /project/node-server

WORKDIR /project/node-server

COPY . .

COPY .env build/

COPY --chown=node:node . .

USER node

RUN yarn global add nodemon typescript

# RUN yarn --production #without dev dependancies
RUN yarn install --frozen-lockfile

RUN yarn buildJSserver

EXPOSE 8080

CMD [ "yarn", "startJSserver" ]
