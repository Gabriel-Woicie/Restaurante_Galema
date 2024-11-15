import { Sequelize } from "sequelize";
import banco from "../banco.js";
export default banco.define("item", {
    iditem: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    preco: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
});