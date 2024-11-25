import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface tiposrestaurantes extends Model {
  idtiporestaurante: number;
  nometiporestaurante: string;
}

export const tiposrestaurantes = sequelize.define<tiposrestaurantes>(
  "tiposrestaurantes",
  {
    idtiporestaurante: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    nometiporestaurante: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "tiposrestaurantes",
    timestamps: false,
  }
);
