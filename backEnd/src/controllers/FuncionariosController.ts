import { Request, Response } from "express";
import { funcionariosModel } from "../models/FuncionariosModel";
import { Op } from "sequelize";

export const findAll = async (req: Request, res: Response) => {
  const funcionarios = await funcionariosModel.findAll();
  res.json(funcionarios);
};

export const findByPk = async (req: Request, res: Response, id: number) => {
  const funcionarios = await funcionariosModel.findByPk(id);
  res.json(funcionarios);
};

export const createNewEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      idfuncionario,
      nomefuncionario,
      salario,
      datacontratacao,
      datademissao,
      situacaofuncionario
    } = req.body;

    const newEmployee = await funcionariosModel.create({
      idfuncionario,
      nomefuncionario,
      salario,
      datacontratacao,
      datademissao,
      situacaofuncionario
    });

    res.status(201).json({ newEmployee });
  } catch (error) {
    console.error("Erro ao criar funcionário:", error);
    res.status(500).json({ error: "Erro ao criar funcionário" });
  }
};

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const idfuncionario = req.params.id;
    const {
        nomefuncionario,
        salario,
        datacontratacao,
        datademissao,
        situacaofuncionario, } = req.body;
    const updateEmployee = await funcionariosModel.update(
      {
        nomefuncionario,
        salario,
        datacontratacao,
        datademissao,
        situacaofuncionario
      },
      {
        where: {
            idfuncionario: {
            [Op.eq]: idfuncionario,
          },
        },
      }
    );
    res.status(201).json({ updateEmployee });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const idfuncionario = req.params.id;
    const deleteEmployee = await funcionariosModel.destroy({
      where: {
        idfuncionario: {
          [Op.eq]: idfuncionario,
        },
      },
    });
    res.status(201).json({ deleteEmployee });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};
