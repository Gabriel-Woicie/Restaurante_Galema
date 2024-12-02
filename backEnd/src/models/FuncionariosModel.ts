import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface FuncionariosInstance extends Model {
  idfuncionario: number;
  nomefuncionario: string;
  salario: number;
  datacontratacao: Date;
  datademissao: Date;
  situacaofuncionario: number;
  idusuario: number;
}

export const funcionariosModel = sequelize.define<FuncionariosInstance>(
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
    situacaofuncionario: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "funcionarios",
    timestamps: false,
  }
);