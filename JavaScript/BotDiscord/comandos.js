import 'dotenv/config'
import {REST, Routes, SlashCommandBuilder} from "discord.js"

const comandos = [
    // perolas do server
    new SlashCommandBuilder()
    .setName("perola")
    .setDescription("registra uma pérola do servidor")
        // inserção do autor
        .addUserOption(
            option => option
            .setName("autor")
            .setDescription("Quem disse a atrocidade")
            .setRequired(true))
        // inserção da fala
        .addStringOption(
            option => option
            .setName("atrocidade")
            .setDescription("Que atrocidade foi dita?")
            .setRequired(true)),


    new SlashCommandBuilder()
    .setName("mensagem_anonima")
    .setDescription("diz algo anonimamente")
    // adiciona o destinatário
    .addUserOption(
        option => option
        .setName("destinatario")
        .setDescription("Pra quem você deseja dizer?")
        .setRequired(true))
    // adiciona a mensagem
    .addStringOption(
        option => option
        .setName("mensagem")
        .setDescription("O que deseja dizer pra pessoa?")
        .setRequired(true))

    ].map(cmd => cmd.toJSON())

    
const rest = new REST().setToken(process.env.DISCORD_TOKEN)
await rest.put(Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID), {body:comandos})
console.log("comandos registrados")
