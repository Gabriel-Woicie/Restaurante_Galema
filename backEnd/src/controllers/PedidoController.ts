import { Request, Response } from "express";
import { PedidosModel } from "../models/PedidosModel";
import { Op } from "sequelize";

export const findAll = async (req: Request, res: Response) => {
  const pedidos = await PedidosModel.findAll();
  res.json(pedidos);
};

export const findByPk = async (req: Request, res: Response, id: number) => {
  const pedidos = await PedidosModel.findByPk(id);
  res.json(pedidos);
};

export const createNewOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { idpedido, datapedido, valorpedido, situacaopedido, idcomanda } =
      req.body;

    const NewOrder = await PedidosModel.create({
      idpedido,
      datapedido: new Date(datapedido),
      valorpedido,
      situacaopedido,
      idcomanda,
    });
    res.status(201).json({ NewOrder });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
};

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const idpedido = req.params.id;
    const { datapedido, valorpedido, situacaopedido, idcomanda } = req.body;
    const updateEmployee = await PedidosModel.update(
      {
        datapedido,
        valorpedido,
        situacaopedido,
        idcomanda,
      },
      {
        where: {
          idpedido: {
            [Op.eq]: idpedido,
          },
        },
      }
    );
    res.status(201).json({ updateOrder });
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    res.status(500).json({ error: "Erro ao atualizar pedido" });
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const idpedido = req.params.id;
    const deleteOrder = await PedidosModel.destroy({
      where: {
        idpedido: {
          [Op.eq]: idpedido,
        },
      },
    });
    res.status(201).json({ deleteOrder });
  } catch (error) {
    console.error("Erro ao deletar pedido:", error);
    res.status(500).json({ error: "Erro ao deletar pedido" });
  }
};
