import { Request, Response } from "express";
import { produtosModel } from "../models/ProdutosModel";
import { Op } from "sequelize";

// Buscar todos os produtos
export const findAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const produtos = await produtosModel.findAll();
    res.json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

export const findByPk = async (req: Request, res: Response, id: number) => {
  const produtos = await produtosModel.findByPk(id);
  res.json(produtos);
};

// Criar um novo produto
export const createNewProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nomeproduto, descricao, categoria, valorproduto, imagem } = req.body;

    const newProduct = await produtosModel.create({
      nomeproduto,
      descricao,
      categoria,
      valorproduto,
      imagem,
    });

    res.status(201).json({ newProduct });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

// Atualizar um produto
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nomeproduto, descricao, categoria, valorproduto , imagem } = req.body;

    const updatedProduct = await produtosModel.update(
      {
        nomeproduto,
        descricao,
        categoria,
        valorproduto,
        imagem,
      },
      {
        where: {
          idproduto: {
            [Op.eq]: id,
          },
        },
      }
    );

    if (updatedProduct[0] > 0) {
      res.status(200).json({ message: "Produto atualizado com sucesso" });
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

// Excluir um produto
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedProduct = await produtosModel.destroy({
      where: {
        idproduto: {
          [Op.eq]: id,
        },
      },
    });

    if (deletedProduct > 0) {
      res.status(200).json({ message: "Produto excluído com sucesso" });
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
};