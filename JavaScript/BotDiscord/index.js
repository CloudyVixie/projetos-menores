import 'dotenv/config'
import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js"

const DESTINATARIO_PEDIDOS_ID = "410491110767460354"

const client = new Client({
    intents: Object.values(GatewayIntentBits)
})

client.once("clientReady", () => {
    console.log("bot online!")
})

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return

    try {
        if (interaction.commandName === "perola") {
            const autor = interaction.options.getUser("autor")
            const atrocidade = interaction.options.getString("atrocidade")
            const data = new Date().toLocaleDateString("pt-BR")
            const canalPerolas = await client.channels.fetch(process.env.DISCORD_PEROLAS_CHANNEL_ID)

            await canalPerolas.send(`"${atrocidade}" — <@${autor.id}>,  ${data}`)
            await interaction.reply({
                content: "KKKKKKKKKK MUITO BOM, MANÉ",
                ephemeral: true
            })
        }

        if (interaction.commandName === "mensagem_anonima") {
            const destinatario = interaction.options.getUser("destinatario")
            const mensagem = interaction.options.getString("mensagem")
            const canalGeral = await client.channels.fetch(process.env.DISCORD_GERAL_CHANNEL_ID)

            await canalGeral.send(`<@${destinatario.id}>, alguém mandou eu te dizer "${mensagem}"`)
            await interaction.reply({
                content: "CUIDADO COM O QUE DIZ, DANADINHO(A)!!",
                ephemeral: true
            })
        }

        if (interaction.commandName === "cargopersonalizado") {
            const nomeCargo = interaction.options.getString("nome", true).trim()
            const cor = interaction.options.getString("cor", true).trim()

            if (!/^#[0-9a-fA-F]{6}$/.test(cor)) {
                await interaction.reply({
                    content: "Cor inválida. Use o formato hexadecimal #RRGGBB, por exemplo #8A2BE2.",
                    ephemeral: true
                })
                return
            }

            if (!nomeCargo) {
                await interaction.reply({
                    content: "O nome do cargo não pode ficar vazio.",
                    ephemeral: true
                })
                return
            }

            const solicitante = interaction.user
            const nomeSolicitante = interaction.member?.displayName
                || solicitante.globalName
                || solicitante.username

            const mensagemPedido = [
                "**Solicitação de cargo personalizado**",
                `**ID de quem pediu:** ${solicitante.id}`,
                `**Nome de quem pediu:** ${nomeSolicitante}`,
                `**Cargo solicitado:** ${nomeCargo}`,
                `**Cor solicitada:** ${cor.toUpperCase()}`
            ].join("\n")

            const destinatario = await client.users.fetch(DESTINATARIO_PEDIDOS_ID)
            await destinatario.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(Number.parseInt(cor.slice(1), 16))
                        .setTitle("Novo pedido de cargo")
                        .setDescription(mensagemPedido)
                        .setFooter({ text: "Solicitação enviada pelo comando /cargopersonalizado" })
                        .setTimestamp()
                ]
            })

            await interaction.reply({
                content: "Pedido enviado por mensagem privada. Agora é só aguardar a análise!",
                ephemeral: true
            })
        }

        if (interaction.commandName === "fotoperfil") {
            const usuario = interaction.options.getUser("usuario", true)
            const foto = usuario.displayAvatarURL({
                extension: "png",
                size: 4096,
                forceStatic: false
            })

            const embed = new EmbedBuilder()
                .setColor(0x5865F2)
                .setTitle(`Foto de perfil de ${usuario.globalName || usuario.username}`)
                .setImage(foto)
                .setDescription(`[Abrir ou salvar imagem original](${foto})`)

            await interaction.reply({ embeds: [embed], ephemeral: true })
        }

        if (interaction.commandName === "bioperfil") {
            const usuario = interaction.options.getUser("usuario", true)

            await interaction.reply({
                content: `Não consigo extrair a bio de **${usuario.globalName || usuario.username}**. A API oficial de bots do Discord não disponibiliza o campo de biografia dos perfis. O comando está registrado, mas essa informação não pode ser consultada por um bot comum.`,
                ephemeral: true
            })
        }
    } catch (error) {
        console.error(`Erro no comando /${interaction.commandName}:`, error)

        const resposta = {
            content: interaction.commandName === "cargopersonalizado"
                ? "Não foi possível enviar o pedido por mensagem privada. Verifique se a pessoa destinatária permite receber mensagens privadas."
                : "Não foi possível concluir esse comando.",
            ephemeral: true
        }

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(resposta)
        } else {
            await interaction.reply(resposta)
        }
    }
})

client.login(process.env.DISCORD_TOKEN)
