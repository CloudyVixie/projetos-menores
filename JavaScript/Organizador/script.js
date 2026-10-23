const entrada = document.getElementById("txtAreaInput");
const saida = document.getElementById("txtAreaOutput");
const contador = document.getElementById("contador");
const mensagem = document.getElementById("mensagem");

document.getElementById("btnOrganizar").addEventListener("click", function () {
    const lista = entrada.value
        .split(/,|\n/)
        .map(item => item.trim())
        .filter(item => item !== "");

    lista.sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));

    saida.value = lista.join("\n");
    contador.textContent = lista.length === 1
        ? "1 item organizado"
        : lista.length + " itens organizados";

    mensagem.textContent = lista.length
        ? "Lista organizada com sucesso."
        : "Adicione algum texto para organizar.";
});

document.getElementById("btnCopiar").addEventListener("click", async function () {
    if (!saida.value) {
        mensagem.textContent = "Organize uma lista antes de copiar.";
        return;
    }

    try {
        await navigator.clipboard.writeText(saida.value);
        mensagem.textContent = "Resultado copiado para a área de transferência.";
    } catch {
        saida.select();
        mensagem.textContent = "Não foi possível copiar automaticamente. Selecione e copie o texto.";
    }
});