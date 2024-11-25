import { Request, Response } from "express";
import { ProdutosModel } from "../models/ProdutosModel";
import { Op } from "sequelize";

export const findAll = async (req: Request, res: Response) => {
  const produtos = await ProdutosModel.findAll();
  res.json(produtos);
};

export const findByPk = async (req: Request, res: Response, id: number) => {
  const produtos = await ProdutosModel.findByPk(id);
  res.json(produtos);
};

export const createNewProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      idproduto,
      nomeproduto,
      tipoproduto,
      situacaoproduto,
      descricao,
      categoria,
      valorproduto,
      idrestaurante } = req.body;

    const newProduct = await ProdutosModel.create({
      idproduto,
      nomeproduto,
      valorproduto,
      situacaoproduto,
      descricao,
      categoria,
      idrestaurante
    });
    res.status(201).json({ newProduct });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const idusuario = req.params.id;
    const { login, senha } = req.body;
    const updateUser = await ProdutosModel.update(
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

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const idproduto = req.params.id;
    const deleteUser = await ProdutosModel.destroy({
      where: {
        idproduto: {
          [Op.eq]: idproduto,
        },
      },
    });
    res.status(201).json({ deleteUser });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};
