import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface restaurante extends Model {
  idrestauraten: number;
  nomerestaurante: string;
  idtiporestaurante: number;
}

export const tiposrestaurantes = sequelize.define<restaurante>(
  "restaurantes",
  {
    idrestaurante: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    nomerestaurante: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    idtiporestaurante: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "tiposrestaurantes",
        key: "idtiporestaurante",
      },
    },
  },
  {
    tableName: "restaurantes",
    timestamps: false,
  }
);
