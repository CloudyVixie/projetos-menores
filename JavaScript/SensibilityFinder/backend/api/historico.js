const express = require('express');
const router = express.Router();
const db = require('../db');
const { exigirLogin } = require('./auth');

router.use(exigirLogin);

router.post('/', (req, res) => {
    const { sensibilidade } = req.body || {};
    if (sensibilidade === '' || sensibilidade === null || sensibilidade === undefined ||
        !Number.isFinite(Number(sensibilidade)) || Number(sensibilidade) <= 0 ||
        Number(sensibilidade) > 1000000) {
        return res.status(400).json({ erro: 'sensibilidade inválida' });
    }

    db.run(
        'INSERT INTO historico (sensibilidade, id_usuario) VALUES (?, ?)',
        [Number(sensibilidade), req.usuario.id],
        function (erro) {
            if (erro) {
                console.error(erro.message);
                return res.status(500).json({ erro: 'histórico não foi salvo' });
            }
            res.status(201).json({ mensagem: 'sensibilidade salva', registro: this.lastID });
        }
    );
});

router.get('/me', (req, res) => {
    db.all(
        'SELECT registro, sensibilidade FROM historico WHERE id_usuario = ? ORDER BY registro DESC',
        [req.usuario.id],
        (erro, registros) => {
            if (erro) {
                console.error(erro.message);
                return res.status(500).json({ erro: 'histórico não foi acessado' });
            }
            res.setHeader('Cache-Control', 'no-store');
            res.json(registros);
        }
    );
});

module.exports = router;
