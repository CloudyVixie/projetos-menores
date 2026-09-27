
document.getElementById("usar_sensi_baixa").style.display = 'none';
document.getElementById("usar_sensi_alta").style.display = 'none';


document.querySelectorAll('.divisor').forEach(elemento => {
    elemento.style.display = 'none'
});



document.getElementById('calcular').onclick = function calcular(sensibilidade){
    sensibilidade = document.getElementById("sensi_base").value
    
    document.getElementById("sensi_baixa").textContent = `Diminua sua sensibilidade para ${sensibilidade*.5}`
    document.getElementById("usar_sensi_baixa").style.display = 'block';



    document.getElementById("sensi_atual").textContent = `Sua sensibilidade atual é ${sensibilidade}`



    document.getElementById("sensi_alta").textContent = `Aumente sua sensibilidade para ${sensibilidade*1.5}`
    document.getElementById("usar_sensi_alta").style.display = 'block';

    document.querySelectorAll('.divisor').forEach(elemento => elemento.style.display = 'block');

}





document.getElementById("usar_sensi_alta").onclick = function sensibilidade_alta(sensibilidade){
    sensibilidade = document.getElementById("sensi_base").value
    document.getElementById("sensi_base").value = sensibilidade*1.5;

    document.querySelectorAll('.divisor').forEach(elemento => elemento.style.display = 'block');

}

document.getElementById("usar_sensi_baixa").onclick = function sensibilidade_baixa(sensibilidade) {
    sensibilidade = document.getElementById("sensi_base").value
    document.getElementById("sensi_base").value = sensibilidade*.5;

    document.querySelectorAll('.divisor').forEach(elemento => elemento.style.display = 'block');
}

