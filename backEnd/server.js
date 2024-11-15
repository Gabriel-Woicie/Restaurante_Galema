import express from "express";
import banco from "./banco.js";
import comanda from "./controller/comandaController.js";
import item from "./controller/itemController.js";
import pedido from "./controller/pedidoController.js";
import usuario from "./controller/usuarioController.js";
// import cors from "cors"

try {
    await banco.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const app = express();
app.use(express.json());
//app.use(cors())

app.get("/comanda", comanda.listar);
app.get("/comanda/:idcomanda", comanda.selecionar); /* com parametro */
app.post("/comanda", comanda.criar);
app.put("/comanda/:idcomanda", comanda.alterar);
app.delete("/comanda/:idcomanda", comanda.excluir);

app.get("/item", item.listar);
app.get("/item/:iditem", item.selecionar); /* com parametro */
app.post("/item", item.criar);
app.put("/item/:iditem", item.alterar);
app.delete("/item/:iditem", item.excluir);

app.get("/pedido", pedido.listar);
app.get("/pedido/:idpedido", pedido.selecionar); /* com parametro */
app.get("/pedido/comanda/:idcomanda", pedido.listarporcomanda); /* com parametro */
app.post("/pedido", pedido.criar);
app.put("/pedido/:idpedido", pedido.alterar);
app.delete("/pedido/:idpedido", pedido.excluir);

app.get("/usuario", usuario.listar);
app.get("/usuario/:idusuario", usuario.selecionar); /* com parametro */
app.post("/usuario", usuario.criar);
app.put("/usuario/:idusuario", usuario.alterar);
app.delete("/usuario/:idusuario", usuario.excluir);

app.listen(3000);