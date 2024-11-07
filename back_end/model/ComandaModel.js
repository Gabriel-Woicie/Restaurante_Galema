import { DataTypes } from "sequelize";
import banco from "../banco.js"; // Importação da conexão com o banco de dados

// Definição do modelo `Comanda`
const ComandaModel = banco.define("comanda", {
  idcomanda: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  data_abertura: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_fechamento: {
    type: DataTypes.DATE,
    allowNull: true, // Pode ser `true` se o campo puder ser nulo até o fechamento
  },
  comaberta: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default ComandaModel;
