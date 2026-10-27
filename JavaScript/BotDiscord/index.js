import 'dotenv/config'
import {Client, GatewayIntentBits} from "discord.js"


const client = new Client({
    intents: Object.values(GatewayIntentBits)
})

client.once("clientReady", ()=>{
    console.log("bot online!")
})


client.on("interactionCreate", async interaction => {
    if (interaction.commandName == "perola"){
        const autor = interaction.options.getUser("autor")
        const atrocidade = interaction.options.getString("atrocidade")
        const data = new Date().toLocaleDateString('pt-BR')
        const canalPerolas = await client.channels.fetch(process.env.DISCORD_PEROLAS_CHANNEL_ID)

        await canalPerolas.send(`"${atrocidade}" — <@${autor.id}>,  ${data}`)
        await interaction.reply({
        content: "KKKKKKKKKK MUITO BOM, MANÉ",
        ephemeral: true
        })

    }

    if (interaction.commandName == "mensagem_anonima") {
        const destinatario = interaction.options.getUser("destinatario")
        const mensagem = interaction.options.getString("mensagem")

        const canalGeral = await client.channels.fetch(process.env.DISCORD_GERAL_CHANNEL_ID)
        await canalGeral.send(`<@${destinatario.id}>, alguém mandou eu te dizer "${mensagem}"`)
        
        await interaction.reply({
        content: "CUIDADO COM O QUE DIZ, DANADINHO(A)!!",
        ephemeral: true
        })
    }
})








client.login(process.env.DISCORD_TOKEN)



// client.on("messageCreate", message=> {
//     if (message.content == "!teste") {
//         message.reply("deu certo")
//     }
// })

