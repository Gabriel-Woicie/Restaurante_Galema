import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface ProdutoInstance extends Model {
  idproduto: number;
  nomeproduto: string;
  descricao: string;
  categoria: boolean;
  valorproduto: number;
}

export const produtosModel = sequelize.define<ProdutoInstance>("produtos", {
  idproduto: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  nomeproduto: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  descricao: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  categoria: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  valorproduto: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
  },
  imagem: {
    allowNull: true,
    type: DataTypes.STRING,
  },
}, {
  tableName: "produtos",
  timestamps: false,
});