import { where } from "sequelize";
import item from "../model/itemModel.js"

async function listar(req, res){
    await item
    .findAll()
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res){
    await item
    .findByPk(req.params.iditem)
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res){
    if (!req.body.nome || !req.body.tipo || !req.body.preco)
        res.status(400).send("Todos os parâmetros são obrigatórios.");

    await item
    .create({ 
        nome: req.body.nome,
        tipo: req.body.tipo,
        preco: req.body.preco
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function alterar(req, res){
    if (!req.body.nome || !req.body.tipo || !req.body.preco)
        res.status(400).send("Todos os parâmetros são obrigatórios.");

    await item
    .update({ 
        nome: req.body.nome,
        tipo: req.body.tipo,
        preco: req.body.preco
    },
    {   where:{
        iditem: req.params.iditem}
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res){
    await item
    .destroy(
    {   where:{
        iditem: req.params.iditem}
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir };