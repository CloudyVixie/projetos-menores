
const API = 'http://localhost:3000';

const autenticacao = document.getElementById('autenticacao');
const aplicacao = document.getElementById('aplicacao');
const mensagemAuth = document.getElementById('mensagemAuth');
const mensagemCalculo = document.getElementById('mensagemCalculo');

let usuario = null;

try {
    usuario = JSON.parse(localStorage.getItem('usuario'));
} catch {
    localStorage.removeItem('usuario');
}

function mostrarAplicacao() {
    autenticacao.hidden = true;
    aplicacao.hidden = false;
    document.getElementById('boasVindas').textContent =
        `Olá, ${usuario.nome}!`;

    carregarHistorico();
}

function mostrarAutenticacao() {
    usuario = null;
    localStorage.removeItem('usuario');
    autenticacao.hidden = false;
    aplicacao.hidden = true;
}

async function enviarDados(url, dados) {
    const resposta = await fetch(`${API}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
        throw new Error(resultado.erro || 'Ocorreu um erro.');
    }

    return resultado;
}

// Cadastro
document.getElementById('formCadastro').addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const nome = document.getElementById('nomeCadastro').value.trim();
    const senha = document.getElementById('senhaCadastro').value;

    try {
        const resultado = await enviarDados('/usuarios', { nome, senha });
        mensagemAuth.textContent = resultado.mensagem;
        document.getElementById('formCadastro').reset();
    } catch (erro) {
        mensagemAuth.textContent = erro.message;
    }
});

// Login
document.getElementById('formLogin').addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const nome = document.getElementById('nomeLogin').value.trim();
    const senha = document.getElementById('senhaLogin').value;

    try {
        const resultado = await enviarDados('/login', { nome, senha });

        usuario = resultado.usuario;
        localStorage.setItem('usuario', JSON.stringify(usuario));

        mensagemAuth.textContent = '';
        document.getElementById('formLogin').reset();
        mostrarAplicacao();
    } catch (erro) {
        mensagemAuth.textContent = erro.message;
    }
});

// Sair
document.getElementById('sair').addEventListener('click', () => {
    mostrarAutenticacao();
});

// Cálculo
const campoSensi = document.getElementById('sensi_base');
const sensiBaixa = document.getElementById('sensi_baixa');
const sensiAtual = document.getElementById('sensi_atual');
const sensiAlta = document.getElementById('sensi_alta');
const botaoBaixa = document.getElementById('usar_sensi_baixa');
const botaoAlta = document.getElementById('usar_sensi_alta');
const divisores = document.querySelectorAll('.divisor');

async function calcular(salvar = false) {
    const valor = campoSensi.value.trim();
    const sensibilidade = Number(valor);

    if (valor === '' || !Number.isFinite(sensibilidade) || sensibilidade <= 0) {
        mensagemCalculo.textContent = 'Digite uma sensibilidade maior que zero.';
        return;
    }

    sensiBaixa.textContent = `Diminua sua sensibilidade para ${sensibilidade * 0.5}`;
    sensiAtual.textContent = `Sua sensibilidade atual é ${sensibilidade}`;
    sensiAlta.textContent = `Aumente sua sensibilidade para ${sensibilidade * 1.5}`;

    botaoBaixa.hidden = false;
    botaoAlta.hidden = false;
    divisores.forEach(elemento => elemento.style.display = 'block');

    mensagemCalculo.textContent = '';

    if (salvar && usuario) {
        try {
            await enviarDados('/historico', {
                id_usuario: usuario.id,
                sensibilidade
            });

            await carregarHistorico();
            mensagemCalculo.textContent = 'Cálculo salvo no histórico.';
        } catch (erro) {
            mensagemCalculo.textContent = erro.message;
        }
    }
}

document.getElementById('calcular').addEventListener('click', () => {
    calcular(true);
});

botaoBaixa.addEventListener('click', () => {
    campoSensi.value = Number(campoSensi.value) * 0.5;
    calcular(true);
});

botaoAlta.addEventListener('click', () => {
    campoSensi.value = Number(campoSensi.value) * 1.5;
    calcular(true);
});

// Histórico
async function carregarHistorico() {
    if (!usuario) return;

    const lista = document.getElementById('listaHistorico');
    lista.replaceChildren();

    try {
        const resposta = await fetch(
            `${API}/historico/${encodeURIComponent(usuario.id)}`
        );

        if (!resposta.ok) {
            throw new Error('Não foi possível carregar o histórico.');
        }

        const registros = await resposta.json();

        if (registros.length === 0) {
            lista.textContent = 'Nenhum cálculo salvo ainda.';
            return;
        }

        registros.forEach(registro => {
            const item = document.createElement('li');
            item.textContent =
                `Registro ${registro.registro}: ${registro.sensibilidade}`;
            lista.appendChild(item);
        });
    } catch (erro) {
        lista.textContent = erro.message;
    }
}

// Inicialização
if (usuario && Number.isInteger(usuario.id) && usuario.id > 0) {
    mostrarAplicacao();
} else {
    mostrarAutenticacao();
}
