import { Router, Request, Response } from "express";    
import * as UsuariosController from "../controllers/UsuariosController";

const router = Router();

router.get("/usuarios", UsuariosController.findAll);


router.get("/usuarios/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    UsuariosController.findByPk(req, res, id);
});

router.post("/usuarios", UsuariosController.createNewUser);
router.put("/usuarios/:id", UsuariosController.updateUser);
router.delete("/usuarios/:id", UsuariosController.deleteUser);
router.get("/usuariosLogin", UsuariosController.login);

export default router;
