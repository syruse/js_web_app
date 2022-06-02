# NOTE: !!!These instructions for debugging and internal using!!!
# NOTE: !!!You don't need them for running!!!
# NOTE: !!!Follow other README.md located one level up!!!

docker pull node
docker pull envoyproxy/envoy:v1.21-latest

docker run -it --name node_js -v C:\Development\js_web_app:/project -p 3000:3000 -p 8080:8080 -p 5001:5001 node bash

# grpc proxy for converting grpc-web (http) to grpc (http2)
docker run --name grpc_proxy -v C:\Development\js_web_app\envoy.yaml:/etc/envoy/envoy.yaml:ro -p 5002:5002 -p 9901:9901 -d envoyproxy/envoy:v1.21-latest

docker run --name mariadb-server -e MYSQL_ROOT_PASSWORD=pass1234! -p 3306:3306 -d mariadb

# execute on server

yarn global add nodemon

yarn global add ts-node typescript


# create and run migration
yarn typeorm migration:generate src/migration/Migration -d src/dataSource.ts

# generate migration !!!Note: 'extends BaseEntity' may cause errors 
yarn typeorm migration:run -d src/dataSource.ts

# generate grpc js stuff
yarn add -D grpc-tools
yarn add -D grpc_tools_node_protoc_ts
yarn add -D protoc-gen-grpc-web
yarn protogen_ts ./src/grpc/proto/msgExchanger.proto
# generate grpc-web stuf for frontend with grpcwebtext mode for requesting
yarn protogen_web ./src/grpc/proto/msgExchanger.proto
ln -s /project/node-server/src/grpc/proto /project/react-app/src/grpc

# run docker image building for node-server separatly
docker build -t eamalafeev/node-grpc-server .
docker run --name node_grpc_server -p 8080:8080 -d eamalafeev/node-grpc-server