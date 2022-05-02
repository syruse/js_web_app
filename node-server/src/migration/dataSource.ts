import { DataSource } from "typeorm";
const ormConfig = require("../../ormconfig.json");

const myDataSource = new DataSource(ormConfig);

export default myDataSource;