const crypto = require('crypto');

const sessoes = new Map();
const COOKIE = 'sensifinder_session';
const DURACAO_SESSAO = 24 * 60 * 60 * 1000;

function criarSessao(usuario) {
    const token = crypto.randomBytes(32).toString('hex');
    sessoes.set(token, {
        usuario: { id: usuario.id, nome: usuario.nome },
        expiraEm: Date.now() + DURACAO_SESSAO
    });
    return token;
}

function lerCookie(req, nome) {
    const cookies = req.headers.cookie || '';
    const item = cookies.split(';').map(parte => parte.trim())
        .find(parte => parte.startsWith(nome + '='));
    return item ? decodeURIComponent(item.slice(nome.length + 1)) : null;
}

function usuarioDaRequisicao(req) {
    const token = lerCookie(req, COOKIE);
    if (!token) return null;

    const sessao = sessoes.get(token);
    if (!sessao) return null;

    if (sessao.expiraEm <= Date.now()) {
        sessoes.delete(token);
        return null;
    }

    return sessao.usuario;
}

function exigirLogin(req, res, next) {
    const usuario = usuarioDaRequisicao(req);
    if (!usuario) {
        return res.status(401).json({ erro: 'faça login para continuar' });
    }
    req.usuario = usuario;
    next();
}

function definirCookie(res, token) {
    const seguro = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    res.setHeader('Set-Cookie',
        COOKIE + '=' + encodeURIComponent(token) +
        '; HttpOnly; SameSite=Lax; Path=/; Max-Age=86400' + seguro
    );
}

function encerrarSessao(req, res) {
    const token = lerCookie(req, COOKIE);
    if (token) sessoes.delete(token);
    res.setHeader('Set-Cookie',
        COOKIE + '=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0' +
        (process.env.NODE_ENV === 'production' ? '; Secure' : '')
    );
}

module.exports = { criarSessao, usuarioDaRequisicao, exigirLogin, definirCookie, encerrarSessao };
