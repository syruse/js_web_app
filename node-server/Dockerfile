FROM node:18.0-alpine

RUN mkdir -p /project/node-server/node_modules

RUN mkdir -p /project/node-server/build && chown -R node:node /project/node-server

WORKDIR /project/node-server

COPY . .

COPY --chown=node:node . .

#change on USER node for production
USER root

RUN yarn global add nodemon ts-node typescript

# RUN yarn --production #without dev dependancies
RUN yarn install --frozen-lockfile

EXPOSE 8080

#change on startJSserver for production
CMD [ "yarn", "startTSserver" ]
