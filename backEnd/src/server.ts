import express, { Request, Response } from "express";
import path from "path";
import mustache from "mustache-express";
import dotenv from "dotenv";
import mainRoutes from "./routes/index";
import { sequelize } from "./instances/pg";

dotenv.config();
const server = express();
server.set("view engine", "mustache");
server.set("views", path.join(__dirname, "views"));
server.engine("mustache", mustache());
server.use(express.static(path.join(__dirname, "../public")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(mainRoutes);
server.use((req: Request, res: Response) => {
  res.status(404).send("Página não encontrada!");
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
}

testConnection();

server.listen(process.env.PORT);
console.log(`Servidor rodando na porta ${process.env.PORT}`);
