
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { nome, senha } = req.body;

    if (
        typeof nome !== 'string' ||
        typeof senha !== 'string' ||
        !nome.trim() ||
        !senha
    ) {
        return res.status(400).json({
            erro: 'insira nome e senha'
        });
    }

    db.run(
        'INSERT INTO usuario (nome, senha) VALUES (?, ?)',
        [nome.trim(), senha],
        function (erro) {
            if (erro) {
                if (erro.code === 'SQLITE_CONSTRAINT') {
                    return res.status(409).json({
                        erro: 'usuário já cadastrado'
                    });
                }

                console.error(erro.message);
                return res.status(500).json({
                    erro: 'o cadastro não foi feito'
                });
            }

            res.status(201).json({
                mensagem: 'cadastrou',
                id: this.lastID
            });
        }
    );
});

module.exports = router;
