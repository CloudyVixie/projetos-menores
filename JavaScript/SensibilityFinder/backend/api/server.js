const express = require('express');
const path = require('path');
const { usuarioDaRequisicao, encerrarSessao } = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;
const caminhoFrontend = path.join(__dirname, '..', '..', 'frontend');

app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));
app.use(express.static(caminhoFrontend));

app.use('/usuarios', require('./cadastrar'));
app.use('/login', require('./login'));
app.use('/historico', require('./historico'));

app.get('/sessao', (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    const usuario = usuarioDaRequisicao(req);
    if (!usuario) return res.status(401).json({ erro: 'sessão não encontrada' });
    res.json({ usuario });
});

app.post('/logout', (req, res) => {
    encerrarSessao(req, res);
    res.status(204).end();
});

app.get('/', (req, res) => res.redirect('/html/login.html'));

app.listen(PORT, () => {
    console.log(`SensiFinder disponível em http://localhost:${PORT}`);
});
