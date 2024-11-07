import express from "express";
import banco from "./banco.js";
import comanda from "./controller/Comanda.js";
import dotenv from "dotenv";
dotenv.config();

try {
  await banco.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const app = express();
app.use(express.json());

app.get("/teste", (request, response) => {
  response.status(200).send("Requisição recebida.");
});

app.post("/teste-parametros/:rp1/:rp2", (request, response) => {
  console.log("Route Params");
  console.log(request.params);

  console.log("Query Params");
  console.log(request.query);

  console.log("Body Params");
  console.log(request.body);

  console.log("Headers Params");
  console.log(request.headers);

  response.status(200).send(request.body.titulo);
});

app.get("/comanda", comanda.listar);
app.get("/comanda/:idcomanda", comanda.selecionar);
app.post("/comanda", comanda.criar);
app.put("/comanda/:idcomanda", comanda.alterar);
app.delete("/comanda/:idcomanda", comanda.excluir);

app.listen(4000);
