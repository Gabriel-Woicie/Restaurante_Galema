import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  "postgres://postgres:postgres@localhost:5432/restaurante"
);