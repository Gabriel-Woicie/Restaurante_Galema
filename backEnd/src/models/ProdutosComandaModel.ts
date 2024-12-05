import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface ProdutoComandaInstance extends Model {
  idprodcomanda: number;
  idcomanda: number;
  idproduto: number;
  itemqtdade: number;
}

export const produtosComandaModel = sequelize.define<ProdutoComandaInstance>(
  "produtoscomanda",
  {
    idprodcomanda: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    idcomanda: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "comandas",
        key: "idcomanda",
      },
    },
    idproduto: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "produtos",
        key: "idproduto",
      },
    },
    itemqtdade: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "produtoscomanda",
    timestamps: false,
  }
);