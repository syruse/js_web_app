# js_web_app

git clone js_web_app

docker pull node
docker pull envoyproxy/envoy:v1.21-latest

docker run -it --name node_js -v C:\Development\js_web_app:/project -p 3000:3000 -p 8080:8080 -p 5001:5001 node bash

# grpc proxy for converting grpc-web (http) to grpc (http2)
docker run --name grpc_proxy -v C:\Development\js_web_app\envoy.yaml:/etc/envoy/envoy.yaml:ro -p 5002:5002 -p 9901:9901 -d envoyproxy/envoy:v1.21-latest

docker run --name mariadb-server -e MYSQL_ROOT_PASSWORD=pass1234! -p 3306:3306 -d mariadb
