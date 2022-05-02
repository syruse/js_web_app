# js_web_app

git clone js_web_app

docker pull node

docker run -it --name node_js -v C:\Development\js_web_app:/project -p 3000:3000 -p 8080:8080  node bash

docker run --name mariadb-server -e MYSQL_ROOT_PASSWORD=pass1234! -p 3306:3306 -d mariadb
