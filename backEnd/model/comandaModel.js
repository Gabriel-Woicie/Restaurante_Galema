import { Sequelize } from "sequelize";
import banco from "../banco.js";
export default banco.define("comanda", {
    idcomanda: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    data_abertura: {
        type: Sequelize.DATE,
        allowNull: false
    },
    data_fechamento: {
        type: Sequelize.DATE,
        allowNull: true
    },
    comaberta: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
});