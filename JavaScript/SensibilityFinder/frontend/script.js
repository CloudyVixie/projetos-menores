const API = '';

async function enviarDados(url, dados) {
    const resposta = await fetch(`${API}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    let resultado = {};
    try {
        resultado = await resposta.json();
    } catch {
        throw new Error('O servidor retornou uma resposta inválida.');
    }

    if (!resposta.ok) {
        throw new Error(resultado.erro || 'Ocorreu um erro na solicitação.');
    }

    return resultado;
}

// Cadastro
const formCadastro = document.getElementById('formCadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const nome = document.getElementById('cadastroNome').value.trim();
        const senha = document.getElementById('cadastroSenha').value;
        const mensagem = document.getElementById('mensagemCadastro');

        mensagem.textContent = 'Cadastrando...';

        try {
            await enviarDados('/usuarios', { nome, senha });
            mensagem.textContent = 'Cadastro realizado! Você será redirecionado para o login.';
            formCadastro.reset();

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 900);
        } catch (erro) {
            mensagem.textContent = erro.message;
        }
    });
}

// Login
const formLogin = document.getElementById('formLogin');

if (formLogin) {
    formLogin.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const nome = document.getElementById('loginNome').value.trim();
        const senha = document.getElementById('loginSenha').value;
        const mensagem = document.getElementById('mensagemLogin');

        mensagem.textContent = 'Entrando...';

        try {
            const resultado = await enviarDados('/login', { nome, senha });

            localStorage.setItem('usuario', JSON.stringify(resultado.usuario));
            window.location.href = 'index.html';
        } catch (erro) {
            mensagem.textContent = erro.message;
        }
    });
}

// Calculadora e histórico
const formSensibilidade = document.getElementById('formSensibilidade');

if (formSensibilidade) {
    let usuario = null;

    try {
        usuario = JSON.parse(localStorage.getItem('usuario'));
    } catch {
        localStorage.removeItem('usuario');
    }

    if (!usuario || !Number.isInteger(usuario.id) || usuario.id <= 0) {
        window.location.replace('login.html');
    } else {
        document.getElementById('nomeUsuario').textContent = usuario.nome;

        const campoSensi = document.getElementById('sensibilidade');
        const resultado = document.getElementById('resultado');
        const listaHistorico = document.getElementById('listaHistorico');

        async function carregarHistorico() {
            listaHistorico.replaceChildren();

            try {
                const resposta = await fetch(`/historico/${encodeURIComponent(usuario.id)}`);
                if (!resposta.ok) {
                    throw new Error('Não foi possível carregar o histórico.');
                }

                const registros = await resposta.json();

                if (registros.length === 0) {
                    const item = document.createElement('li');
                    item.textContent = 'Nenhum cálculo salvo ainda.';
                    listaHistorico.appendChild(item);
                    return;
                }

                registros.forEach((registro) => {
                    const item = document.createElement('li');
                    item.textContent = `Sensibilidade: ${registro.sensibilidade}`;
                    listaHistorico.appendChild(item);
                });
            } catch (erro) {
                const item = document.createElement('li');
                item.textContent = erro.message;
                listaHistorico.appendChild(item);
            }
        }

        formSensibilidade.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            const valor = campoSensi.value.trim();
            const sensibilidade = Number(valor);

            if (valor === '' || !Number.isFinite(sensibilidade) || sensibilidade <= 0) {
                resultado.textContent = 'Digite uma sensibilidade maior que zero.';
                return;
            }

            const baixa = sensibilidade * 0.5;
            const alta = sensibilidade * 1.5;

            resultado.replaceChildren();

            const atual = document.createElement('p');
            atual.textContent = `Sensibilidade atual: ${sensibilidade}`;

            const valorBaixo = document.createElement('p');
            valorBaixo.textContent = `Sensibilidade 50% menor: ${baixa}`;

            const valorAlto = document.createElement('p');
            valorAlto.textContent = `Sensibilidade 50% maior: ${alta}`;

            resultado.append(atual, valorBaixo, valorAlto);

            try {
                await enviarDados('/historico', {
                    id_usuario: usuario.id,
                    sensibilidade
                });
                await carregarHistorico();
            } catch (erro) {
                const aviso = document.createElement('p');
                aviso.textContent = erro.message;
                resultado.appendChild(aviso);
            }
        });

        document.getElementById('sair').addEventListener('click', () => {
            localStorage.removeItem('usuario');
            window.location.href = 'login.html';
        });

        carregarHistorico();
    }
}