// CREATE TABLE pedidos(
// 	idpedido SERIAL PRIMARY KEY,
// 	datapedido DATE NOT NULL,
// 	valorpedido DECIMAL(6,2) NOT NULL,
// 	situacaopedido INTEGER NOT NULL,
// 	idcomanda INTEGER REFERENCES comandas(idcomanda)
// );

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface PedidoInstance extends Model {
  idpedido: number;
  datapedido: Date;
  valorpedido: number;
  situacaopedido: number;
  idcomanda: number;
}
export const PedidosModel = sequelize.define<PedidoInstance>(
  "pedidos",
  {
    idpedido: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    datapedido: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    valorpedido: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    situacaopedido: {
      allowNull: false,
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
  },
  {
    tableName: "pedidos",
    timestamps: false,
  }
);
