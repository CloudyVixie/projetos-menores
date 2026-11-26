# BotDiscord

Bot de Discord desenvolvido com JavaScript e discord.js. Mantém os comandos de registro de pérolas e mensagens anônimas e pode ler automaticamente as mensagens de um canal usando uma voz de referência processada pelo XTTS-v2.

## Recursos

- `/perola`: registra uma frase em um canal específico.
- `/mensagem_anonima`: envia uma mensagem ao canal geral.
- Leitura automática das mensagens de um canal de texto em um canal de voz.
- Fila de reprodução para evitar que áudios sejam sobrepostos.
- Síntese em português com a gravação de referência configurada no XTTS VoiceLab.

## Arquitetura

O GitHub armazena o código, mas não mantém o bot conectado nem executa o modelo XTTS-v2 continuamente. Para usar a leitura automática, o processo Node.js e o serviço Python precisam estar em execução em uma máquina ligada.

O serviço Python utiliza o projeto [XTTS-VoiceLab](https://github.com/CloudyVixie/XTTS-VoiceLab) localmente. A API escuta somente em `127.0.0.1` por padrão e exige uma chave compartilhada com o bot.

## Requisitos

- Node.js 20 ou superior.
- Python 3.10 ou 3.11 para o XTTS VoiceLab.
- Um áudio de referência próprio ou autorizado.
- Bot com permissões para ler mensagens, conectar e falar nos canais configurados.

## Configuração do bot

1. Instale as dependências com `npm install`.
2. Copie `.env.example` para `.env`.
3. Preencha o token, os IDs dos canais e uma chave aleatória longa em `XTTS_API_KEY`.
4. No Discord Developer Portal, habilite o **Message Content Intent**.
5. Garanta permissões de visualizar canais, ler histórico, conectar e falar.

## Configuração do XTTS VoiceLab

1. Clone o repositório XTTS VoiceLab na mesma máquina.
2. Coloque o arquivo de voz em `input/`, mantendo somente um arquivo.
3. Instale as dependências do VoiceLab conforme o README dele.
4. Crie um arquivo `.env` na raiz do XTTS VoiceLab com a mesma chave:

   ```env
   XTTS_API_KEY=mesma_chave_configurada_no_bot
   XTTS_API_PORT=8765
   ```

5. No ambiente Python do VoiceLab, instale Flask:

   ```bash
   pip install Flask python-dotenv
   ```

6. Inicie a API a partir da pasta `JavaScript/BotDiscord`:

   ```bash
   python api_server.py
   ```

   O serviço espera esta estrutura de pastas:

   ```text
   projetos/
   ├── XTTS-VoiceLab/
   └── projetos-menores/
       └── JavaScript/BotDiscord/
   ```

## Iniciar

Com a API XTTS em execução, abra outro terminal na pasta do bot:

```bash
npm install
npm run commands
npm start
```

As mensagens enviadas no canal definido em `DISCORD_TTS_TEXT_CHANNEL_ID` serão sintetizadas e reproduzidas no canal definido em `DISCORD_TTS_VOICE_CHANNEL_ID`. Mensagens de bots, mensagens vazias e textos acima de 500 caracteres são ignorados.

## Limitações

- O serviço XTTS e o bot precisam estar ligados ao mesmo tempo.
- A primeira síntese pode demorar enquanto o modelo é carregado.
- A fila processa uma mensagem por vez; textos longos podem aumentar a espera.
- O modelo XTTS-v2 é distribuído sob a Coqui Public Model License. Consulte os termos antes de qualquer uso ou redistribuição.
- Use apenas gravações de voz próprias ou com autorização adequada.
