import { where } from "sequelize";
import usuario from "../model/usuarioModel.js"

async function login(req, res){
    if (!req.body.usuario || !req.body.senha)
        res.status(400).send("Todos os parâmetros (nome, senha) são obrigatórios.");

    await usuario
    .findOne({
        where: {
            nome: req.body.nome,
            senha: req.body.senha
        }
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function listar(req, res){
    await usuario
    .findAll()
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res){
    await usuario
    .findByPk(req.params.idusuario)
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res){
    if (!req.body.nome || !req.body.senha || !req.body.email)
        res.status(400).send("Todos os parâmetros (nome, senha, email) são obrigatórios.");

    await usuario
    .create({ 
        nome: req.body.nome,
        senha: req.body.senha,
        email: req.body.email
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function alterar(req, res){
    if (!req.body.nome || !req.body.senha || !req.body.email)
        res.status(400).send("Todos os parâmetros (nome, senha, email) são obrigatórios.");

    await usuario
    .update({
        nome: req.body.nome,
        senha: req.body.senha,
        email: req.body.email
    }, {
        where: { idusuario: req.params.idusuario }
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res){
    await usuario
    .destroy({ where: { idusuario: req.params.idusuario } })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir, login };