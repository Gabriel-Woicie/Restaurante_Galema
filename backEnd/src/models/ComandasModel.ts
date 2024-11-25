import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface ComandaInstance extends Model {
  idcomanda: number;
  situacaocomanda: number;
  valorcomanda: number;
  idmesa: number;
  idfuncionario: number;
}
export const Comanda = sequelize.define<ComandaInstance>(
  "comandas",
  {
    idcomanda: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    situacaocomanda: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    valorcomanda: {
      allowNull: true,
      type: DataTypes.DECIMAL,
    },
    idmesa: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "mesas",
        key: "idmesa",
      },
    },
    idfuncionario: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "funcionarios",
        key: "idfuncionario",
      },
    },
  },
  {
    tableName: "comandas",
    timestamps: false,
  }
);
