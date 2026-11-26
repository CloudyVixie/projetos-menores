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
- Node.js
- discord.js
- dotenv para variáveis de ambiente

## Como configurar

1. Instale uma versão recente do Node.js.
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
node comandos.js
```

Esse script registra os comandos de barra da aplicação.

## Iniciar o bot

Execute:

```bash
node index.js
```

Mantenha o processo em execução para que o bot continue conectado. O tempo em que ele fica online depende do ambiente de hospedagem utilizado.
