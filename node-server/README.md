yarn global add nodemon

yarn global add ts-node typescript


# create and run migration
yarn typeorm migration:generate src/migration/Migration -d src/dataSource.ts

# generate migration
yarn typeorm migration:run -d src/dataSource.ts

# generate grpc js stuff
yarn add -D grpc-tools
yarn add -D grpc_tools_node_protoc_ts
yarn protogen_ts ./src/grpc/proto/msgExchanger.proto

