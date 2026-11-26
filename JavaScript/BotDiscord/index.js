import 'dotenv/config';
import { Client, GatewayIntentBits } from "discord.js";
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
    if (!process.env[name]) throw new Error(`Variável obrigatória ausente: ${name}`);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ],
});

const queues = new Map();
const players = new Map();
const processing = new Set();
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
            const canal = await client.channels.fetch(process.env.DISCORD_PEROLAS_CHANNEL_ID);

            await canal.send(`"${atrocidade}" — <@${autor.id}>, ${data}`);
            await interaction.reply({ content: "KKKKKKKKKK MUITO BOM, MANÉ", ephemeral: true });
        }

        if (interaction.commandName === "mensagem_anonima") {
            const destinatario = interaction.options.getUser("destinatario");
            const mensagem = interaction.options.getString("mensagem");
            const canal = await client.channels.fetch(process.env.DISCORD_GERAL_CHANNEL_ID);

            await canal.send(`<@${destinatario.id}>, alguém mandou eu te dizer "${mensagem}"`);
            await interaction.reply({ content: "CUIDADO COM O QUE DIZ, DANADINHO(A)!!", ephemeral: true });
        }
    } catch (error) {
        console.error("Erro ao executar comando:", error);
        const response = { content: "Não foi possível executar esse comando.", ephemeral: true };
        if (interaction.replied || interaction.deferred) await interaction.followUp(response);
        else await interaction.reply(response);
    }
});

function getPlayer(guildId) {
    if (!players.has(guildId)) {
        const player = createAudioPlayer({
            behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
        });
        player.on("error", error => console.error("Erro no player de voz:", error));
        players.set(guildId, player);
    }
    return players.get(guildId);
}

async function getVoicePlayer(guild) {
    const channel = await guild.channels.fetch(process.env.DISCORD_TTS_VOICE_CHANNEL_ID);
    if (!channel?.isVoiceBased()) {
        throw new Error("DISCORD_TTS_VOICE_CHANNEL_ID não aponta para um canal de voz.");
    }

    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: true,
    });

    connection.on("error", error => console.error("Erro na conexão de voz:", error));
    if (connection.state.status !== VoiceConnectionStatus.Ready) {
        await entersState(connection, VoiceConnectionStatus.Ready, 20_000);
    }

    const player = getPlayer(guild.id);
    connection.subscribe(player);
    return player;
}

async function synthesize(text) {
    const apiUrl = (process.env.XTTS_API_URL || "http://127.0.0.1:8765").replace(/\/$/, "");
    const apiKey = process.env.XTTS_API_KEY;
    if (!apiKey) throw new Error("Configure XTTS_API_KEY no .env.");

    const response = await fetch(`${apiUrl}/synthesize`, {
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

function waitForPlayback(player) {
    return new Promise((resolve, reject) => {
        const onIdle = () => {
            player.off("error", onError);
            resolve();
        };
        const onError = error => {
            player.off(AudioPlayerStatus.Idle, onIdle);
            reject(error);
        };
        player.once(AudioPlayerStatus.Idle, onIdle);
        player.once("error", onError);
    });
}

async function processQueue(guildId) {
    if (processing.has(guildId)) return;
    processing.add(guildId);

    try {
        const queue = queues.get(guildId);
        while (queue?.length) {
            const item = queue.shift();
            try {
                const audio = await synthesize(item.text);
                const player = await getVoicePlayer(item.guild);
                const playback = waitForPlayback(player);
                player.play(createAudioResource(Readable.from(audio), {
                    inputType: StreamType.OggOpus,
                }));
                await playback;
            } catch (error) {
                console.error("Falha ao reproduzir mensagem sintetizada:", error);
            }
        }
    } finally {
        processing.delete(guildId);
        if (queues.get(guildId)?.length) void processQueue(guildId);
    }
}

client.on("messageCreate", message => {
    if (!process.env.DISCORD_TTS_TEXT_CHANNEL_ID ||
        !process.env.DISCORD_TTS_VOICE_CHANNEL_ID ||
        message.author.bot ||
        message.webhookId ||
        message.channelId !== process.env.DISCORD_TTS_TEXT_CHANNEL_ID) return;

    const text = message.content.trim();
    if (!text || text.length > MAX_TTS_CHARACTERS) return;

    const queue = queues.get(message.guildId) ?? [];
    queue.push({ text, guild: message.guild });
    queues.set(message.guildId, queue);
    void processQueue(message.guildId);
});

client.login(process.env.DISCORD_TOKEN);
