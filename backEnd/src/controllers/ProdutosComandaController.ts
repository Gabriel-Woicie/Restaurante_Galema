import { Request, Response } from "express";
import { produtosComandaModel } from "../models/ProdutosComandaModel";
import { Op } from "sequelize";

export const findAll = async (req: Request, res: Response) => {
  try {
    const produtosComanda = await produtosComandaModel.findAll();
    res.json(produtosComanda);
  } catch (error) {
    console.error("Erro ao buscar produtos da comanda:", error);
    res.status(500).json({ error: "Erro ao buscar produtos da comanda" });
  }
};

export const findByPk = async (req: Request, res: Response, id: number) => {
  const produtosComanda = await produtosComandaModel.findByPk(id);
  res.json(produtosComanda);
};

export const createNewProdutoComanda = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idcomanda, idproduto, itemqtdade } = req.body;

    const newProdutoComanda = await produtosComandaModel.create({
      idcomanda,
      idproduto,
      itemqtdade,
    });

    res.status(201).json({ newProdutoComanda });
  } catch (error) {
    console.error("Erro ao criar produto da comanda:", error);
    res.status(500).json({ error: "Erro ao criar produto da comanda" });
  }
};

export const updateProdutoComanda = async (req: Request, res: Response): Promise<void> => {
  try {
    const idprodcomanda = req.params.id;
    const { idcomanda, idproduto, itemqtdade } = req.body;

    const updateProdutoComanda = await produtosComandaModel.update(
      {
        idcomanda,
        idproduto,
        itemqtdade,
      },
      {
        where: {
          idprodcomanda: {
            [Op.eq]: idprodcomanda,
          },
        },
      }
    );

    if (updateProdutoComanda[0] > 0) {
      res.status(200).json({ message: "Produto da comanda atualizado com sucesso" });
    } else {
      res.status(404).json({ message: "Produto da comanda não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar produto da comanda:", error);
    res.status(500).json({ error: "Erro ao atualizar produto da comanda" });
  }
};

export const deleteProdutoComanda = async (req: Request, res: Response): Promise<void> => {
  try {
    const idprodcomanda = req.params.id;
    const deleteProdutoComanda = await produtosComandaModel.destroy({
      where: {
        idprodcomanda: {
          [Op.eq]: idprodcomanda,
        },
      },
    });

    if (deleteProdutoComanda > 0) {
      res.status(200).json({ message: "Produto da comanda excluído com sucesso" });
    } else {
      res.status(404).json({ message: "Produto da comanda não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao excluir produto da comanda:", error);
    res.status(500).json({ error: "Erro ao excluir produto da comanda" });
  }
};