# ☁️ SensiFinder

Um site para testar variações de sensibilidade em jogos de mira. O projeto começou como um script em Python e depois foi refeito em JavaScript.

A interface usa um fundo de nuvens e painéis translúcidos inspirados no Liquid Glass.

## O que dá para fazer

- Criar uma conta e entrar com nome de usuário e senha.
- Calcular três valores a partir da sensibilidade atual.
- Escolher qual dos valores calculados deseja salvar.
- Consultar o histórico de sensibilidades salvas.
- Sair da conta pela própria interface.

## Como o cálculo funciona

Ao informar uma sensibilidade, o site calcula três opções:

| Cálculo | Fórmula | Exemplo com 4 |
| --- | --- | ---: |
| Metade do valor | Sensibilidade × 0,5 | 2 |
| Valor atual | Sensibilidade × 1 | 4 |
| Uma vez e meia | Sensibilidade × 1,5 | 6 |

Os resultados aparecem como opções selecionáveis. Somente o valor escolhido é salvo no histórico da conta.

## Como iniciar

Você precisa ter o [Node.js](https://nodejs.org/) instalado (versão 20.17 ou superior, necessária pela versão atual do sqlite3).

1. Abra um terminal na pasta `JavaScript/SensibilityFinder`.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   npm start
   ```

4. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

O terminal precisa continuar aberto enquanto o site estiver em uso. O banco SQLite é criado em `SensiFinderDB.sqlite` quando o backend inicia. O arquivo do banco fica local e não deve ser enviado ao GitHub.

## Como organizei os arquivos

```text
SensibilityFinder/
├── backend/
│   ├── api/
│   │   ├── auth.js
│   │   ├── cadastrar.js
│   │   ├── historico.js
│   │   ├── login.js
│   │   └── server.js
│   └── db.js
├── frontend/
│   ├── css/
│   ├── html/
│   └── script.js
├── .gitignore
├── package.json
└── nodeInit.bat
```

## Tecnologias usadas

- **HTML** para a estrutura das páginas.
- **CSS** para o layout, o fundo de nuvens e o efeito Liquid Glass.
- **JavaScript** para os cálculos e a interação com a interface.
- **Node.js e Express** para o servidor e as rotas da API.
- **SQLite** para guardar as contas e o histórico.
- **scrypt** para armazenar hashes de senha em vez de senhas em texto puro.

## O que pratiquei

- Manipulação do DOM e eventos de formulário.
- Requisições HTTP com `fetch` e envio de dados em JSON.
- Criação de rotas com Express.
- Operações SQL e relacionamento entre tabelas.
- Sessões de login com cookie HttpOnly.
- Validação de dados no backend.

## Observações sobre segurança

As senhas novas são armazenadas com hash scrypt e salt aleatório. Contas antigas com senha em texto puro são migradas para hash no primeiro login bem-sucedido. As rotas do histórico exigem uma sessão válida e usam o usuário autenticado, em vez de confiar em um ID enviado pelo navegador.

Este projeto continua sendo um projeto de estudo. Para publicar como serviço, ainda é necessário avaliar proteção contra tentativas repetidas de login, uso de HTTPS, armazenamento persistente de sessões e outras medidas de produção.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](../../LICENSE).
