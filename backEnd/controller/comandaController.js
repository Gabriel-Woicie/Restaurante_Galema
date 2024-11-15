import { where } from "sequelize";
import comanda from "../model/comandaModel.js"

async function listar(req, res) {
    await comanda
    .findAll()
    .then(resultado => {res.status(200).json(resultado) })
    .catch(erro => {res.status(500).json(erro) });
}

async function selecionar(req, res) {
    if (!req.params.idcomanda)
        res.status(500).send("Parametro é obrigatório.");

    await comanda
    .findByPk(req.params.idcomanda)
    .then(resultado => {res.status(200).json(resultado) })
    .catch(erro => {res.status(500).json(erro) });
}

async function criar(req, res) {
    if (!req.body.data_abertura || !req.body.comaberta || !req.body.nome)
        res.status(500).send("Parametro data de abertura é obrigatório.");

    await comanda
        .create({
            data_abertura: req.body.data_abertura,
            comaberta: req.body.comaberta,
            nome: req.body.nome
        })
        .then(resultado => {res.status(200).json(resultado) })
        .catch(erro => {res.status(500).json(erro) });
}

async function alterar(req, res) {
    if (!req.body.comaberta || !req.body.nome)
        res.status(500).send("Parametro é obrigatório.");

    await comanda
        .update({
            comaberta: req.body.comaberta,
            nome: req.body.nome
        },
        {
            where: {
                idcomanda: req.body.idcomanda
            }
        })
        .then(resultado => {res.status(200).json(resultado) })
        .catch(erro => {res.status(500).json(erro) });
}

async function excluir(req, res) {
    await comanda
        .destroy(
        {
            where: {
                idcomanda: req.params.idcomanda
            }
        })
        .then(resultado => {res.status(200).json(resultado) })
        .catch(erro => {res.status(500).json(erro) });
}

export default {listar, selecionar, criar, alterar, excluir};