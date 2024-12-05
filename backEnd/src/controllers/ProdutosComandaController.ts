import { Request, Response } from "express";
import { produtosComandaModel } from "../models/ProdutosComandaModel";
import { produtosModel } from "../models/ProdutosModel";
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

export const findDetailsByComanda = async (req: Request, res: Response) => {
  const { idcomanda } = req.params;

  try {
    // Buscar os produtos vinculados à comanda específica
    const produtosComanda = await produtosComandaModel.findAll({
      where: { idcomanda: idcomanda },
    });

    if (!produtosComanda.length) {
      return res.status(404).json({ message: "Nenhum produto encontrado nesta comanda." });
    }

    // Obter os IDs dos produtos vinculados
    const idsProdutos = produtosComanda.map((item) => item.idproduto);

    // Buscar os detalhes dos produtos pelos IDs
    const produtos = await produtosModel.findAll({
      where: {
        idproduto: {
          [Op.in]: idsProdutos,
        },
      },
    });

    // Mapear os resultados para incluir os dados do produto e quantidade
    const produtosDetalhes = produtosComanda.map((prodComanda) => {
      const produto = produtos.find((prod) => prod.idproduto === prodComanda.idproduto);
      return {
        idprodcomanda: prodComanda.idprodcomanda,
        idproduto: prodComanda.idproduto,
        itemqtdade: prodComanda.itemqtdade,
        nomeproduto: produto ? produto.nomeproduto : "Produto não encontrado",
        valorproduto: produto ? produto.valorproduto : 0,
      };
    });

    res.json(produtosDetalhes);
  } catch (error) {
    console.error("Erro ao buscar os detalhes dos produtos da comanda:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};