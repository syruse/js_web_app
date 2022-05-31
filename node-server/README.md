yarn global add nodemon

yarn global add ts-node typescript


# create and run migration
yarn typeorm migration:generate src/migration/Migration -d src/dataSource.ts

# generate migration
yarn typeorm migration:run -d src/dataSource.ts

# generate grpc js stuff
yarn add -D grpc-tools
yarn add -D grpc_tools_node_protoc_ts
yarn add -D protoc-gen-grpc-web
yarn protogen_ts ./src/grpc/proto/msgExchanger.proto
# generate grpc-web stuf for frontend with grpcwebtext mode for requesting
yarn protogen_web ./src/grpc/proto/msgExchanger.proto
ln -s /project/node-server/src/grpc/proto /project/react-app/src/grpc

# run docker image building
docker build -t eamalafeev/node-grpc-server .
docker run --name node_grpc_server -p 8080:8080 -d eamalafeev/node-grpc-server