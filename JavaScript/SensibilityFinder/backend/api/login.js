const express = require('express');
const crypto = require('crypto');
const db = require('../db');
const { criarSessao, definirCookie } = require('./auth');
const router = express.Router();

function verificarSenha(senha, armazenada) {
    return new Promise((resolve, reject) => {
        if (!armazenada.startsWith('scrypt$')) return resolve(false);
        const partes = armazenada.split('$');
        if (partes.length !== 3 || !partes[1] || !/^[a-f0-9]{128}$/i.test(partes[2])) {
            return resolve(false);
        }
        crypto.scrypt(senha, partes[1], 64, (erro, chave) => {
            if (erro) return reject(erro);
            const esperada = Buffer.from(partes[2], 'hex');
            resolve(esperada.length === chave.length && crypto.timingSafeEqual(esperada, chave));
        });
    });
}

function criarHash(senha) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.scrypt(senha, salt, 64, (erro, chave) => {
            if (erro) return reject(erro);
            resolve('scrypt$' + salt + '$' + chave.toString('hex'));
        });
    });
}

router.post('/', (req, res) => {
    const { nome, senha } = req.body || {};
    if (typeof nome !== 'string' || typeof senha !== 'string' ||
        !nome.trim() || nome.trim().length > 100 || !senha || senha.length > 1024) {
        return res.status(400).json({ erro: 'informe nome e senha válidos' });
    }

    db.get('SELECT id, nome, senha FROM usuario WHERE nome = ?', [nome.trim()], async (erro, usuario) => {
        if (erro) {
            console.error(erro.message);
            return res.status(500).json({ erro: 'não foi possível entrar' });
        }
        if (!usuario) return res.status(401).json({ erro: 'nome ou senha incorretos' });

        try {
            let valido = await verificarSenha(senha, usuario.senha);
            // Migra senhas antigas em texto puro na primeira autenticação bem-sucedida.
            if (!valido && !usuario.senha.startsWith('scrypt$') && usuario.senha === senha) {
                const hash = await criarHash(senha);
                await new Promise((resolve, reject) => {
                    db.run('UPDATE usuario SET senha = ? WHERE id = ?', [hash, usuario.id],
                        erroAtualizacao => erroAtualizacao ? reject(erroAtualizacao) : resolve());
                });
                valido = true;
            }
            if (!valido) return res.status(401).json({ erro: 'nome ou senha incorretos' });

            const token = criarSessao(usuario);
            definirCookie(res, token);
            res.setHeader('Cache-Control', 'no-store');
            res.json({ mensagem: 'login realizado', usuario: { id: usuario.id, nome: usuario.nome } });
        } catch (erroInterno) {
            console.error(erroInterno.message);
            res.status(500).json({ erro: 'não foi possível entrar' });
        }
    });
});

module.exports = router;
