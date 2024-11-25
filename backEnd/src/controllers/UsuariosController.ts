import { Request, Response } from "express";
import { UsuariosModel, UsuarioInstance } from "../models/UsuariosModel";
import { Op } from "sequelize";
import { funcionariosModel } from "../models/FuncionariosModel";

export const findAll = async (req: Request, res: Response) => {
  const usuarios = await UsuariosModel.findAll();
  res.json(usuarios);
};

export const findByPk = async (req: Request, res: Response, id: number) => {
  const usuarios = await UsuariosModel.findByPk(id);
  res.json(usuarios);
};

export const createNewUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { idusuario, login, senha } = req.body;
    const novoUsuario = await UsuariosModel.create({
      idusuario,
      login,
      senha,
    });
    res.status(201).json({ novoUsuario });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const idusuario = req.params.id;
    const { login, senha } = req.body;
    const updateUser = await UsuariosModel.update(
      {
        login,
        senha,
      },
      {
        where: {
          idusuario: {
            [Op.eq]: idusuario,
          },
        },
      }
    );
    res.status(201).json({ updateUser });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const idusuario = req.params.id;
    const deleteUser = await UsuariosModel.destroy({
      where: {
        idusuario: {
          [Op.eq]: idusuario,
        },
      },
    });
    res.status(201).json({ deleteUser });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { login, senha } = req.query;
    if (!login || !senha) {
      res
        .status(200)
        .json({ sucesso: false, mensagem: "Login e senha são obrigatórios." });
      return;
    }
    const usuario = await UsuariosModel.findOne({
      where: {
        login: {
          [Op.eq]: login,
        },
        senha: {
          [Op.eq]: senha,
        },
      },
    });

    if (usuario) {
      const funcionario = await funcionariosModel.findOne({
        where: {
          idusuario: {
            [Op.eq]: usuario.idusuario,
          },
        },
      });

      res.status(200).json({
        sucesso: true,
        mensagem: "Login bem-sucedido.",
        funcionario,
      });
    } else {
      res
        .status(200)
        .json({ sucesso: false, mensagem: "Login ou senha inválidos." });
    }
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ sucesso: false, error: "Erro ao realizar login" });
  }
};
