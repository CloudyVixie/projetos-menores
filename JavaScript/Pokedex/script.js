document.getElementById("txtPokedexPokemon").style.display = "none";
document.getElementById("txtNomePokemon").style.display = "none";
document.getElementById("txtTipoPokemon").style.display = "none";
document.getElementById("imgPokemon").style.display = "none";



document.getElementById('btnPesquisar').addEventListener("click", function(){
    let infoPokemon = document.getElementById("inputPokemon").value
    obterDados(infoPokemon)
})


async function obterDados(infoPokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${infoPokemon}`
    try{
        const resposta = await fetch(url)
        if(!resposta.ok) {
            throw new Error(`Deu erro: ${resposta.status}`)
        }

        const resultado = await resposta.json()
        console.log(resultado)

        const numPokedex = resultado.id;
        const nomePokemon = resultado.name;
        const tipagemPokemon = resultado.types.map(item => item.type.name);
        const spritePokemon = resultado.sprites.other.home.front_default;

        document.getElementById("txtPokedexPokemon").textContent = `Pokedex: ${numPokedex}`;
        document.getElementById("txtNomePokemon").textContent = `Nome: ${nomePokemon}`;
        document.getElementById("txtTipoPokemon").textContent = `Tipagem: ${tipagemPokemon.join(", ")}`;

        if (spritePokemon) {
            document.getElementById("imgPokemon").src = spritePokemon;
        } else {
            document.getElementById("imgPokemon").removeAttribute("src");
        }

        document.getElementById("txtPokedexPokemon").style.display = "block";
        document.getElementById("txtNomePokemon").style.display = "block";
        document.getElementById("txtTipoPokemon").style.display = "block";
        document.getElementById("imgPokemon").style.display = "block";


    }catch (error) {
        console.error(error.message)
    }


}

