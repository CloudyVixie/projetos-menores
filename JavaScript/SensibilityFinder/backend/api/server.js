const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const caminhoFrontend = path.join(__dirname, '..', '..', 'frontend');

app.use(express.json());
app.use(express.static(caminhoFrontend));

app.use('/usuarios', require('./cadastrar'));
app.use('/login', require('./login'));
app.use('/historico', require('./historico'));

app.get('/', (req, res) => {
    res.redirect('/html/login.html');
});

app.listen(PORT, () => {
    console.log(`SensiFinder disponível em http://localhost:${PORT}`);
});