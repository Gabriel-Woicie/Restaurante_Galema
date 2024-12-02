import { Router, Request, Response } from "express";

import * as UsuariosController from "../controllers/UsuariosController";
import * as ProdutosController from "../controllers/ProdutosController";
import * as FuncionariosController from "../controllers/FuncionariosController";
import * as PedidosController from "../controllers/PedidosController";
import * as ComandasController from "../controllers/ComandasController";

const router = Router();

// user routes
router.get("/usuarios", UsuariosController.findAll);

router.get("/usuarios/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  UsuariosController.findByPk(req, res, id);
});

router.post("/usuarios", UsuariosController.createNewUser);
router.put("/usuarios/:id", UsuariosController.updateUser);
router.delete("/usuarios/:id", UsuariosController.deleteUser);
router.get("/usuariosLogin", UsuariosController.login);

// product routes
router.get("/produtos", ProdutosController.findAll);

router.get("/produtos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  ProdutosController.findByPk(req, res, id);
});

router.post("/produtos", ProdutosController.createNewProduct);
router.put("/produtos/:id", ProdutosController.updateProduct);  // Corrigido
router.delete("/produtos/:id", ProdutosController.deleteProduct);  // Corrigido

// employee routes
router.get("/funcionario", FuncionariosController.findAll);

router.get("/funcionario/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  FuncionariosController.findByPk(req, res, id);
});

router.post("/funcionario", FuncionariosController.createNewEmployee);
router.put("/funcionario/:id", FuncionariosController.updateEmployee);
router.delete("/funcionario/:id", FuncionariosController.deleteEmployee);

// order routes
router.get("/pedidos", PedidosController.findAll);

router.get("/pedidos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  PedidosController.findByPk(req, res, id);
});

router.post("/pedidos", PedidosController.createNewOrder);
router.put("/pedidos/:id", PedidosController.updateOrder);
router.delete("/pedidos/:id", PedidosController.deleteOrder);

// order routes
router.get("/comandas", ComandasController.findAll);

router.get("/comandas/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  ComandasController.findByPk(req, res, id);
});

router.post("/comandas", ComandasController.createNewComanda);
router.put("/comandas/:id", ComandasController.updateComanda);
router.delete("/comandas/:id", ComandasController.deleteComanda);

export default router;