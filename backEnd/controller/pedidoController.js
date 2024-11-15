import { where } from "sequelize";
import pedido from "../model/pedidoModel.js";
import comanda from "../model/comandaModel.js";
import item from "../model/itemModel.js";


async function listar(req, res) {
    await pedido
    .findAll({
        include: [
            { model: comanda, attributes: ['comanda'], as: 'comanda'},
            { model: item, attributes: ['item'], as: 'item'},
        ]
    })
    .then(resultado => {res.status(200).json(resultado) })
    .catch(erro => {res.status(500).json(erro) });
}

async function selecionar(req, res) {
    if (!req.params.idpedido)
        res.status(500).send("Parametro idpedido é obrigatório.");

    await pedido
    .findByPk(req.params.idpedido)
    .then(resultado => {res.status(200).json(resultado) })
    .catch(erro => {res.status(500).json(erro) });
}

async function listarporcomanda(req, res) {
    await pedido
    .findAll({
        include: [
            { model: comanda, attributes: ['comanda'], as: 'comanda'},
            { model: item, attributes: ['item'], as: 'item'},
        ],
        where: {idcomanda: req.params.idcomanda}
    })
    .then(resultado => {res.status(200).json(resultado) })
    .catch(erro => {res.status(500).json(erro) });
}


async function criar(req, res) {
    if (!req.body.comanda_idcomanda || !req.body.item_iditem || !req.body.quantidade || !req.body.status)
        res.status(500).send("Parametros são obrigatório.");

    await pedido
        .create({
            comanda_idcomanda: req.body.comanda_idcomanda,
            item_iditem: req.body.item_iditem,
            quantidade: req.body.quantidade,
            status: req.body.status
            })
        .then(resultado => {res.status(200).json(resultado) })
        .catch(erro => {res.status(500).json(erro) });
}

async function alterar(req, res) {
    if (!req.body.comanda_idcomanda || !req.body.item_iditem || !req.body.quantidade || !req.body.status)
        res.status(500).send("Parametros são obrigatório.");

    await pedido
    .update({
        comanda_idcomanda: req.body.comanda_idcomanda,
        item_iditem: req.body.item_iditem,
        quantidade: req.body.quantidade,
        status: req.body.status
        },
        {
            where: {
                idpedido: req.params.idpedido
            }
        })
        .then(resultado => {res.status(200).json(resultado) })
        .catch(erro => {res.status(500).json(erro) });
}

async function excluir(req, res) {
    await pedido
        .destroy(
        {
            where: {
                idpedido: req.params.idpedido
            }
        })
        .then(resultado => {res.status(200).json(resultado) })
        .catch(erro => {res.status(500).json(erro) });
}

export default {listar, selecionar, criar, alterar, excluir, listarporcomanda};