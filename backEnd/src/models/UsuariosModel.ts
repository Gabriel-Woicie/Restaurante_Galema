// CREATE TABLE usuarios(
// 	idusuario SERIAL PRIMARY KEY,
// 	login VARCHAR(50) NOT NULL,
// 	senha VARCHAR(20) NOT NULL,
// 	tipousuario INTEGER NOT NULL,
// 	idfuncionario INTEGER REFERENCES funcionarios(idfuncionario)
// );

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface UsuarioInstance extends Model {
  idusuario: number;
  login: string;
  senha: string;
}

export const UsuariosModel = sequelize.define<UsuarioInstance>(
  "usuarios",
  {
    idusuario: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    login: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    senha: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);
