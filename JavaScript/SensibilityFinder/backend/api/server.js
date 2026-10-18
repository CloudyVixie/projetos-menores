
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', require('./cadastrar'));
app.use('/login', require('./login'));
app.use('/historico', require('./historico'));

app.listen(3000, () => {
    console.log('API disponível em http://localhost:3000');
});
