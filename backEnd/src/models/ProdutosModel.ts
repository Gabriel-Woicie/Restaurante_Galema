// CREATE TABLE produtos(
// 	idproduto SERIAL PRIMARY KEY,
// 	nomeproduto VARCHAR(50) NOT NULL,
// 	situacaoproduto INTEGER NOT NULL,
// 	descricao VARCHAR(200),
// 	categoria INTEGER NOT NULL,
// 	valorproduto DECIMAL(10,2) NOT NULL,
// 	idrestaurante INTEGER REFERENCES restaurantes(idrestaurante)
// );

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface ProdutoInstance extends Model {
  idproduto: number;
  nomeproduto: string;
  situacaoproduto: number;
  descricao: string;
  categoria: number;
  idrestaurante: number;
}

export const ProdutosModel = sequelize.define<ProdutoInstance>(
  "produtos",
  {
    idproduto: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    nomeproduto: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    situacaoproduto: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    descricao: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    categoria: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    valorproduto: {
      allowNull: false,
      type: DataTypes.DECIMAL,
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
    tableName: "produtos",
    timestamps: false,
  }
);
