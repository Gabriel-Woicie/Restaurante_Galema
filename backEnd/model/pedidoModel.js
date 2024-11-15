import { Sequelize } from "sequelize";
import banco from "../banco.js";
export default banco.define("pedido", {
    idpedido: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    comanda_idcomanda: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    item_iditem: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});