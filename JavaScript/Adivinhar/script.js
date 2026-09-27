

// let palpite = document.getElementById("palpite")
let contador = 0
const numero = 43

document.getElementById("tentar").onclick= function adivinhar(palpite) {
    palpite =  document.getElementById("palpite").value;

    if (palpite == numero){
        contador++;
        document.getElementById("tentativas").textContent = ' '
        document.getElementById("situacao").textContent = `Você acertou após ${contador} tentativas!`
        }
    else if (palpite > numero){
        contador++;
        document.getElementById("situacao").textContent = 'Seu palpite está acima do número!'
        document.getElementById("tentativas").textContent = `Tentativas: ${contador}`;

        }
    else if (palpite < numero){
        contador++;
        document.getElementById("situacao").textContent = 'Seu palpite está abaixo do número!'
        document.getElementById("tentativas").textContent = `Tentativas: ${contador}`;
        }
    else if (palpite < 0 || palpite > 100){
        document.getElementById("situacao").textContent = 'O número não é abaixo de 0 e nem acima de 100!'
    }

}




// let palpite = Number(prompt("Qual seu palpite?"))



