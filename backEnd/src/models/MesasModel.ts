import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface mesas extends Model {
  idmesa: number;
  situacaodamesa: number;
  idrestaurante: number;
}

export const mesas = sequelize.define<mesas>(
  "mesas",
  {
    idmesa: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    situacaodamesa: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    idrestaurante: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "restaurantes",
        key: "idrestaurante",
      },
    },
  },
  {
    tableName: "mesas",
    timestamps: false,
  }
);
