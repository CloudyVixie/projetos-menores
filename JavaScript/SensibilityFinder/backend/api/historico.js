
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { id_usuario, sensibilidade } = req.body;

    if (
        !Number.isInteger(Number(id_usuario)) ||
        Number(id_usuario) <= 0 ||
        sensibilidade === '' ||
        sensibilidade === null ||
        sensibilidade === undefined ||
        !Number.isFinite(Number(sensibilidade)) ||
        Number(sensibilidade) <= 0
    ) {
        return res.status(400).json({
            erro: 'usuário ou sensibilidade inválidos'
        });
    }

    db.run(
        'INSERT INTO historico (sensibilidade, id_usuario) VALUES (?, ?)',
        [Number(sensibilidade), Number(id_usuario)],
        function (erro) {
            if (erro) {
                console.error(erro.message);
                return res.status(500).json({
                    erro: 'histórico não foi salvo'
                });
            }

            res.status(201).json({
                mensagem: 'sensi salva',
                registro: this.lastID
            });
        }
    );
});

router.get('/:id_usuario', (req, res) => {
    const idUsuario = Number(req.params.id_usuario);

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        return res.status(400).json({
            erro: 'id inválido'
        });
    }

    db.all(
        `SELECT registro, sensibilidade
         FROM historico
         WHERE id_usuario = ?
         ORDER BY registro DESC`,
        [idUsuario],
        (erro, registros) => {
            if (erro) {
                console.error(erro.message);
                return res.status(500).json({
                    erro: 'histórico não foi acessado'
                });
            }

            res.json(registros);
        }
    );
});

module.exports = router;
