yarn global add nodemon

yarn global add ts-node typescript


# create and run migration
yarn typeorm migration:generate src/migration/Migration -d src/dataSource.ts

yarn typeorm migration:run -d src/dataSource.ts

