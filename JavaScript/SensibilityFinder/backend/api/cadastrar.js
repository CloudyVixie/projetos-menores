const express = require('express');
const crypto = require('crypto');
const db = require('../db');
const router = express.Router();

function criarHash(senha) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.scrypt(senha, salt, 64, (erro, chave) => {
            if (erro) return reject(erro);
            resolve('scrypt$' + salt + '$' + chave.toString('hex'));
        });
    });
}

router.post('/', async (req, res) => {
    const { nome, senha } = req.body || {};

    if (typeof nome !== 'string' || typeof senha !== 'string' ||
        !nome.trim() || nome.trim().length > 100 || senha.length < 8 || senha.length > 1024) {
        return res.status(400).json({
            erro: 'informe um nome de até 100 caracteres e uma senha entre 8 e 1024 caracteres'
        });
    }

    try {
        const hash = await criarHash(senha);
        db.run(
            'INSERT INTO usuario (nome, senha) VALUES (?, ?)',
            [nome.trim(), hash],
            function (erro) {
                if (erro) {
                    if (erro.code === 'SQLITE_CONSTRAINT') {
                        return res.status(409).json({ erro: 'usuário já cadastrado' });
                    }
                    console.error(erro.message);
                    return res.status(500).json({ erro: 'o cadastro não foi feito' });
                }
                res.status(201).json({ mensagem: 'cadastro realizado', id: this.lastID });
            }
        );
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ erro: 'não foi possível proteger a senha' });
    }
});

module.exports = router;
