import { Router, Request, Response } from "express";
import { Client } from "pg";

import * as ProdutosController from "../controllers/ProdutosController";
import * as FuncionariosController from "../controllers/FuncionariosController";
import * as ComandasController from "../controllers/ComandasController";

const router = Router();

// procedure de login

router.get("/verificarLogin", async (req: Request, res: Response) => {
  const { usuario, senha } = req.query;

  if (!usuario || !senha) {
    return res.status(400).json({
      success: false,
      message: "Os parâmetros 'usuario' e 'senha' são obrigatórios.",
    });
  }

  const client = new Client({
    user: "postgres", 
    host: "localhost",   
    database: "restaurante", 
    password: "postgres",   
    port: 5432,              
  });

  try {

    await client.connect();

    const result = await client.query(
      'SELECT verificar_login($1, $2) AS resultado',
      [usuario, senha]
    );

    const isValidLogin = result.rows[0]?.resultado;

    if (isValidLogin) {
      res.status(200).json({
        success: true,
        message: "Login válido!",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Login ou senha inválidos.",
      });
    }
  } catch (error) {
    console.error("Erro ao verificar login:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno no servidor ao verificar login.",
    });
  } finally {
    await client.end();
  }
});

// procedure de login

// produtos routes
router.get("/produtos", ProdutosController.findAll);

router.get("/produtos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  ProdutosController.findByPk(req, res, id);
});

router.post("/produtos", ProdutosController.createNewProduct);
router.put("/produtos/:id", ProdutosController.updateProduct);  // Corrigido
router.delete("/produtos/:id", ProdutosController.deleteProduct);  // Corrigido

// funcionarios routes
router.get("/funcionario", FuncionariosController.findAll);

router.get("/funcionario/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  FuncionariosController.findByPk(req, res, id);
});

router.post("/funcionario", FuncionariosController.createNewEmployee);
router.put("/funcionario/:id", FuncionariosController.updateEmployee);
router.delete("/funcionario/:id", FuncionariosController.deleteEmployee);

// comandas routes
router.get("/comandas", ComandasController.findAll);

router.get("/comandas/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  ComandasController.findByPk(req, res, id);
});

router.post("/comandas", ComandasController.createNewComanda);
router.put("/comandas/:id", ComandasController.updateComanda);
router.delete("/comandas/:id", ComandasController.deleteComanda);

export default router;