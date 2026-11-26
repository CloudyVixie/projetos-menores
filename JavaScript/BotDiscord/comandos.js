import 'dotenv/config'
import { REST, Routes, SlashCommandBuilder } from "discord.js"

const comandos = [
    new SlashCommandBuilder()
        .setName("perola")
        .setDescription("registra uma pérola do servidor")
        .addUserOption(option => option
            .setName("autor")
            .setDescription("Quem disse a atrocidade")
            .setRequired(true))
        .addStringOption(option => option
            .setName("atrocidade")
            .setDescription("Que atrocidade foi dita?")
            .setRequired(true)),

    new SlashCommandBuilder()
        .setName("mensagem_anonima")
        .setDescription("diz algo anonimamente")
        .addUserOption(option => option
            .setName("destinatario")
            .setDescription("Pra quem você deseja dizer?")
            .setRequired(true))
        .addStringOption(option => option
            .setName("mensagem")
            .setDescription("O que deseja dizer pra pessoa?")
            .setRequired(true)),

    new SlashCommandBuilder()
        .setName("cargopersonalizado")
        .setDescription("solicita a criação de um cargo personalizado")
        .addStringOption(option => option
            .setName("nome")
            .setDescription("Nome desejado para o cargo")
            .setMaxLength(100)
            .setRequired(true))
        .addStringOption(option => option
            .setName("cor")
            .setDescription("Cor em hexadecimal, por exemplo #8A2BE2")
            .setMaxLength(7)
            .setRequired(true)),

    new SlashCommandBuilder()
        .setName("fotoperfil")
        .setDescription("mostra a imagem de perfil de um usuário")
        .addUserOption(option => option
            .setName("usuario")
            .setDescription("Usuário cuja foto deseja visualizar")
            .setRequired(true)),

    new SlashCommandBuilder()
        .setName("bioperfil")
        .setDescription("verifica a disponibilidade da bio de um usuário")
        .addUserOption(option => option
            .setName("usuario")
            .setDescription("Usuário cuja bio deseja consultar")
            .setRequired(true))
].map(comando => comando.toJSON())

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN)

await rest.put(
    Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID),
    { body: comandos }
)

console.log("Comandos registrados.")
