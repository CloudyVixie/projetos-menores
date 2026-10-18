
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
            erro: 'insira nome e senha.'
        });
    }

    db.get(
        'SELECT id, nome FROM usuario WHERE nome = ? AND senha = ?',
        [nome.trim(), senha],
        (erro, usuario) => {
            if (erro) {
                console.error(erro.message);
                return res.status(500).json({
                    erro: 'não logou'
                });
            }

            if (!usuario) {
                return res.status(401).json({
                    erro: 'nome ou senha estão errados'
                });
            }

            res.json({
                mensagem: 'logou',
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome
                }
            });
        }
    );
});

module.exports = router;
