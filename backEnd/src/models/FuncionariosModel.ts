import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface FuncionariosIntance extends Model {
  idfuncionario: number;
  nomefuncionario: string;
  salario: number;
  datacontratacao: Date;
  datademissao: Date;
  cargo: number;
  situacaofuncionario: number;
  idrestaurante: number;
  idusuario: number;
}

export const funcionariosModel = sequelize.define<FuncionariosIntance>(
  "funcionarios",
  {
    idfuncionario: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    nomefuncionario: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    salario: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    datacontratacao: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    datademissao: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    cargo: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    situacaofuncionario: {
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
    idusuario: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "idusuario",
      },
    },
  },
  {
    tableName: "funcionarios",
    timestamps: false,
  }
);
