import 'dotenv/config';
import {
    Client,
    GatewayIntentBits,
} from "discord.js";
import {
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource,
    entersState,
    joinVoiceChannel,
    NoSubscriberBehavior,
    VoiceConnectionStatus,
    StreamType,
} from "@discordjs/voice";
import { Readable } from "node:stream";

const requiredEnv = [
    "DISCORD_TOKEN",
    "DISCORD_PEROLAS_CHANNEL_ID",
    "DISCORD_GERAL_CHANNEL_ID",
];

for (const name of requiredEnv) {
    if (!process.env[name]) {
        throw new Error(`Variável obrigatória ausente: ${name}`);
    }
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ],
});

const ttsQueues = new Map();
const players = new Map();
const MAX_TTS_CHARACTERS = 500;

client.once("clientReady", () => {
    console.log(`Bot online como ${client.user.tag}`);

    if (!process.env.DISCORD_TTS_TEXT_CHANNEL_ID ||
        !process.env.DISCORD_TTS_VOICE_CHANNEL_ID) {
        console.log("Leitura automática desativada: configure os canais TTS no .env.");
    }
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    try {
        if (interaction.commandName === "perola") {
            const autor = interaction.options.getUser("autor");
            const atrocidade = interaction.options.getString("atrocidade");
            const data = new Date().toLocaleDateString("pt-BR");
            const canalPerolas = await client.channels.fetch(
                process.env.DISCORD_PEROLAS_CHANNEL_ID
            );

            await canalPerolas.send(`"${atrocidade}" — <@${autor.id}>, ${data}`);
            await interaction.reply({
                content: "KKKKKKKKKK MUITO BOM, MANÉ",
                ephemeral: true,
            });
        }

        if (interaction.commandName === "mensagem_anonima") {
            const destinatario = interaction.options.getUser("destinatario");
            const mensagem = interaction.options.getString("mensagem");
            const canalGeral = await client.channels.fetch(
                process.env.DISCORD_GERAL_CHANNEL_ID
            );

            await canalGeral.send(
                `<@${destinatario.id}>, alguém mandou eu te dizer "${mensagem}"`
            );
            await interaction.reply({
                content: "CUIDADO COM O QUE DIZ, DANADINHO(A)!!",
                ephemeral: true,
            });
        }
    } catch (error) {
        console.error("Erro ao executar comando:", error);
        const response = {
            content: "Não foi possível executar esse comando.",
            ephemeral: true,
        };

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(response);
        } else {
            await interaction.reply(response);
        }
    }
});

function getPlayer(guildId) {
    if (!players.has(guildId)) {
        const player = createAudioPlayer({
            behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
        });

        player.on("error", error => {
            console.error("Erro no player de voz:", error);
        });

        players.set(guildId, player);
        player.on(AudioPlayerStatus.Idle, () => playNext(guildId));
    }

    return players.get(guildId);
}

async function getVoicePlayer(guild) {
    const voiceChannelId = process.env.DISCORD_TTS_VOICE_CHANNEL_ID;
    const voiceChannel = await guild.channels.fetch(voiceChannelId);

    if (!voiceChannel?.isVoiceBased()) {
        throw new Error("DISCORD_TTS_VOICE_CHANNEL_ID não aponta para um canal de voz.");
    }

    let connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: true,
    });

    connection.on("error", error => {
        console.error("Erro na conexão de voz:", error);
    });

    if (connection.state.status !== VoiceConnectionStatus.Ready) {
        await entersState(connection, VoiceConnectionStatus.Ready, 20_000);
    }

    const player = getPlayer(guild.id);
    connection.subscribe(player);
    return player;
}

async function synthesize(text) {
    const apiUrl = process.env.XTTS_API_URL || "http://127.0.0.1:8765";
    const apiKey = process.env.XTTS_API_KEY;

    if (!apiKey) {
        throw new Error("Configure XTTS_API_KEY no .env.");
    }

    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/synthesize`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ text, language: "pt" }),
        signal: AbortSignal.timeout(180_000),
    });

    if (!response.ok) {
        const detail = await response.text();
        throw new Error(`XTTS respondeu ${response.status}: ${detail.slice(0, 300)}`);
    }

    return Buffer.from(await response.arrayBuffer());
}

async function playNext(guildId) {
    const queue = ttsQueues.get(guildId);
    if (!queue?.length) return;

    const item = queue.shift();

    try {
        const audio = await synthesize(item.text);
        const player = await getVoicePlayer(item.guild);
        const resource = createAudioResource(Readable.from(audio), {
            inputType: StreamType.OggOpus,
        });

        player.play(resource);
    } catch (error) {
        console.error("Não foi possível sintetizar/reproduzir a mensagem:", error);
        if (queue.length) void playNext(guildId);
    }
}

client.on("messageCreate", message => {
    const textChannelId = process.env.DISCORD_TTS_TEXT_CHANNEL_ID;

    if (!textChannelId ||
        message.author.bot ||
        message.webhookId ||
        message.channelId !== textChannelId) {
        return;
    }

    const text = message.content.trim();
    if (!text) return;

    if (text.length > MAX_TTS_CHARACTERS) {
        console.log(`Mensagem ignorada: limite de ${MAX_TTS_CHARACTERS} caracteres.`);
        return;
    }

    const queue = ttsQueues.get(message.guildId) ?? [];
    queue.push({ text, guild: message.guild });
    ttsQueues.set(message.guildId, queue);

    if (queue.length === 1) void playNext(message.guildId);
});

client.login(process.env.DISCORD_TOKEN);
