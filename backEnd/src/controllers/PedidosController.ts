import { Request, Response } from "express";
import { PedidosModel } from "../models/PedidosModel";
import { Op } from "sequelize";

// Buscar todos os pedidos
export const findAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const pedidos = await PedidosModel.findAll();
    res.json(pedidos);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
};

// Buscar um pedido por ID
export const findByPk = async (req: Request, res: Response, id: number): Promise<void> => {
  try {
    const { id } = req.params;
    const pedido = await PedidosModel.findByPk(id);

    if (pedido) {
      res.json(pedido);
    } else {
      res.status(404).json({ error: "Pedido não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    res.status(500).json({ error: "Erro ao buscar pedido" });
  }
};

// Criar um novo pedido
export const createNewOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { datapedido, idproduto, quantidade, idcomanda } = req.body;

    const newOrder = await PedidosModel.create({
      datapedido: new Date(datapedido),
      idproduto,
      quantidade,
      idcomanda,
    });

    res.status(201).json({ newOrder });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
};

// Atualizar um pedido
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { datapedido, idproduto, quantidade, idcomanda } = req.body;

    const updatedOrder = await PedidosModel.update(
      {
        datapedido,
        idproduto,
        quantidade,
        idcomanda,
      },
      {
        where: {
          idpedido: {
            [Op.eq]: id,
          },
        },
      }
    );

    if (updatedOrder[0] > 0) {
      res.status(200).json({ message: "Pedido atualizado com sucesso" });
    } else {
      res.status(404).json({ error: "Pedido não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    res.status(500).json({ error: "Erro ao atualizar pedido" });
  }
};

// Excluir um pedido
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedOrder = await PedidosModel.destroy({
      where: {
        idpedido: {
          [Op.eq]: id,
        },
      },
    });

    if (deletedOrder > 0) {
      res.status(200).json({ message: "Pedido excluído com sucesso" });
    } else {
      res.status(404).json({ error: "Pedido não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao excluir pedido:", error);
    res.status(500).json({ error: "Erro ao excluir pedido" });
  }
};