const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const caminhoBanco = path.join(__dirname, '..', 'SensiFinderDB.sqlite');

const db = new sqlite3.Database(caminhoBanco, (erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco:', erro.message);
        return;
    }

    console.log('Conectado ao SensiFinderDB.sqlite!');
});

db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON');

    db.run(`
        CREATE TABLE IF NOT EXISTS usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(100) NOT NULL UNIQUE,
            senha VARCHAR(255) NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS historico (
            registro INTEGER PRIMARY KEY AUTOINCREMENT,
            sensibilidade REAL NOT NULL,
            id_usuario INTEGER NOT NULL,
            FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        )
    `);
});

module.exports = db;    