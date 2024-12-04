import { Request, Response } from "express";
import { comandasModel } from "../models/ComandasModel";
import { Op } from "sequelize";

export const findAll = async (req: Request, res: Response) => {
  try {
    const comandas = await comandasModel.findAll();
    res.json(comandas);
  } catch (error) {
    console.error("Erro ao buscar comandas:", error);
    res.status(500).json({ error: "Erro ao buscar comandas" });
  }
};

export const findByPk = async (req: Request, res: Response, id: number) => {
  const comandas = await comandasModel.findByPk(id);
  res.json(comandas);
};

export const createNewComanda = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nomecomanda, idcomanda, situacaocomanda, valorcomanda, idfuncionario, idpedido } = req.body;

    const newComanda = await comandasModel.create({
      nomecomanda,
      idcomanda,
      situacaocomanda,
      valorcomanda,
      idfuncionario,
    });

    res.status(201).json({ newComanda });
  } catch (error) {
    console.error("Erro ao criar comanda:", error);
    res.status(500).json({ error: "Erro ao criar comanda" });
  }
};

export const updateComanda = async (req: Request, res: Response): Promise<void> => {
  try {
    const idcomanda = req.params.id;
    const { nomecomanda, situacaocomanda, valorcomanda, idfuncionario, idpedido } = req.body;

    const updateComanda = await comandasModel.update(
      {
        nomecomanda,
        situacaocomanda,
        valorcomanda,
        idfuncionario,
        idpedido,
      },
      {
        where: {
          idcomanda: {
            [Op.eq]: idcomanda,
          },
        },
      }
    );

    if (updateComanda[0] > 0) {
      res.status(200).json({ message: "Comanda atualizada com sucesso" });
    } else {
      res.status(404).json({ message: "Comanda não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao atualizar comanda:", error);
    res.status(500).json({ error: "Erro ao atualizar comanda" });
  }
};

export const deleteComanda = async (req: Request, res: Response): Promise<void> => {
  try {
    const idcomanda = req.params.id;
    const deleteComanda = await comandasModel.destroy({
      where: {
        idcomanda: {
          [Op.eq]: idcomanda,
        },
      },
    });

    if (deleteComanda > 0) {
      res.status(200).json({ message: "Comanda excluída com sucesso" });
    } else {
      res.status(404).json({ message: "Comanda não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao excluir comanda:", error);
    res.status(500).json({ error: "Erro ao excluir comanda" });
  }
};