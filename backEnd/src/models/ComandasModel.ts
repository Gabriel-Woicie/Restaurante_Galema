import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface ComandaInstance extends Model {
  idcomanda: number;
  situacaocomanda: boolean;  // Alterado para booleano
  valorcomanda: number;
  idmesa: number;
  idfuncionario: number;
  idpedido: number;  // Referência ao idpedido
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
    idfuncionario: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "funcionarios",
        key: "idfuncionario",
      },
    },
    idpedido: {
      allowNull: true, 
      type: DataTypes.INTEGER,
      references: {
        model: "pedidos", 
        key: "idpedido",   
      },
    },
  },
  {
    tableName: "comandas",
    timestamps: false,
  }
);