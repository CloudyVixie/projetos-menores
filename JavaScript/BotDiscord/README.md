# BotDiscord

Bot de Discord desenvolvido com JavaScript e discord.js.

## Comandos

- `/perola`: registra uma frase em um canal específico.
- `/mensagem_anonima`: envia uma mensagem ao canal geral.
- `/cargopersonalizado`: solicita um cargo informando nome e cor hexadecimal. O pedido é enviado por mensagem privada ao responsável configurado no código.
- `/fotoperfil`: exibe a imagem de perfil do usuário selecionado, com link para abrir ou salvar a imagem.
- `/bioperfil`: informa a limitação de acesso à bio. A API oficial de bots do Discord não disponibiliza esse campo.

As respostas dos comandos são enviadas de forma efêmera, visíveis apenas para quem executou o comando.

## Tecnologias

- JavaScript com módulos ES
- Node.js 22 ou superior
- discord.js
- dotenv para variáveis de ambiente
- GitHub Actions para validação automática

## Como configurar

1. Instale o Node.js 22 ou superior.
2. Abra um terminal nesta pasta e instale as dependências:

   ```bash
   npm install
   ```

3. Copie `.env.example` para um arquivo chamado `.env`.
4. Preencha as variáveis com os dados da aplicação e dos canais do Discord:

   ```env
   DISCORD_TOKEN=token_do_seu_bot
   DISCORD_APPLICATION_ID=id_da_aplicacao
   DISCORD_PEROLAS_CHANNEL_ID=id_do_canal_perolas
   DISCORD_GERAL_CHANNEL_ID=id_do_canal_geral
   ```

   Nunca compartilhe o token do bot nem envie o arquivo `.env` para o GitHub.

## Registrar os comandos

Depois de preencher o `.env`, execute:

```bash
npm run register
```

Esse script registra os comandos de barra da aplicação. Normalmente, basta executá-lo novamente quando houver alterações nos comandos.

## Iniciar o bot

Execute:

```bash
npm start
```

O processo precisa permanecer em execução para manter o bot conectado ao Discord.

## GitHub Actions

O workflow `.github/workflows/botdiscord.yml` instala as dependências e verifica a sintaxe dos arquivos JavaScript a cada alteração relevante no repositório. Também pode ser iniciado manualmente pela aba **Actions**.

Esse workflow é destinado à validação do projeto, não à hospedagem contínua do bot. O GitHub Actions não deve ser usado como servidor permanente de um bot conectado ao Discord. Para manter a conexão ativa usando somente recursos próprios, será necessário executar o processo em um computador ligado, por exemplo, no computador local.

