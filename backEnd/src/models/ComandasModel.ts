import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface ComandaInstance extends Model {
  idcomanda: number;
  situacaocomanda: boolean;
  valorcomanda: number;
  idmesa: number;
  idfuncionario: number;
}

export const comandasModel = sequelize.define<ComandaInstance>(
  "comandas",
  {
    idcomanda: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
    situacaocomanda: {
      allowNull: false,
      type: DataTypes.BOOLEAN, 
    },
    valorcomanda: {
      allowNull: true,
      type: DataTypes.DECIMAL,
    },
    nomecomanda: {
      allowNull: false,
      type: DataTypes.STRING(100),
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