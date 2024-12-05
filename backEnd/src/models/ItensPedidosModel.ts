// CREATE TABLE itenspedidos(
// 	iditempedido SERIAL PRIMARY KEY,
// 	qtditempedido INTEGER NOT NULL,
// 	valorproduto DECIMAL(6,2) NOT NULL,
// 	itemsituacao INTEGER NOT NULL,
// 	idproduto INTEGER REFERENCES produtos(idproduto),
// 	idpedido INTEGER REFERENCES pedidos(idpedido)
// );

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface ItensPedidoInstance extends Model {
  iditempedido: number;
  qtditempedido: number;
  valorproduto: number;
  itemsituacao: number;
  idproduto: number;
  idpedido: number;
}

export const ItensPedido = sequelize.define<ItensPedidoInstance>(
  "itenspedidos",
  {
    iditempedido: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    qtditempedido: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    valorproduto: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    itemsituacao: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    idproduto: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "produtos",
        key: "idproduto",
      },
    },
    idpedido: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "pedidos",
        key: "idpedido",
      },
    },
  },
  {
    tableName: "itenspedidos",
    timestamps: false,
  }
);
