document.getElementById("btnBuscar").addEventListener("click", function() {

campoResultadoSituacao.style.display = "none"
const id = document.getElementById("txtId").value
consumirApi(id)
})


const campoResultadoId = document.getElementById("lblId")
const campoResultadoNome = document.getElementById("lblNome")
const campoResultadoEmail = document.getElementById("lblEmail")
const campoResultadoSituacao = document.getElementById("lblSituacao")



async function consumirApi(id) {
    
    const url = `https://jsonplaceholder.typicode.com/users/${id}`

    try {
        const resposta = await fetch(url)

        if (!resposta.ok) {
            throw new Error(`Deu erro: ${resposta.status}`)
        }

        const dados = await resposta.json()

        campoResultadoId.textContent = `ID: ${dados.id}`
        campoResultadoNome.textContent = `NOME: ${dados.name}`
        campoResultadoEmail.textContent = `EMAIL: ${dados.email}`


    } catch (error) {
        console.error(error.message)
        campoResultadoSituacao.style.display = "block"
        campoResultadoSituacao.textContent = "Usuário não encontrado"
    }
}

