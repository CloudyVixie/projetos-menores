document.getElementById("btnOrganizar").addEventListener("click", function(){
    let texto = document.getElementById("txtAreaInput").value;
    let lista = texto.split(/, |\n/);

lista.sort((a, b) => a.localeCompare(b, "pt-BR"));

document.getElementById("txtAreaOutput").textContent = lista.join("\n");
})



document.getElementById("btnCopiar").addEventListener("click", function (){
    let textoOrganizado = document.getElementById("txtAreaOutput").value
    navigator.clipboard.writeText(textoOrganizado)
})

