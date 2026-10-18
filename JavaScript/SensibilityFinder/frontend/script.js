const API = '';

async function enviarDados(url, dados) {
    const resposta = await fetch(`${API}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    let resultado = {};
    try { resultado = resposta.status === 204 ? {} : await resposta.json(); }
    catch { throw new Error('O servidor retornou uma resposta inválida.'); }
    if (!resposta.ok) throw new Error(resultado.erro || 'Ocorreu um erro na solicitação.');
    return resultado;
}

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
            setTimeout(() => { window.location.href = 'login.html'; }, 900);
        } catch (erro) { mensagem.textContent = erro.message; }
    });
}

const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        const nome = document.getElementById('loginNome').value.trim();
        const senha = document.getElementById('loginSenha').value;
        const mensagem = document.getElementById('mensagemLogin');
        mensagem.textContent = 'Entrando...';
        try {
            await enviarDados('/login', { nome, senha });
            window.location.href = 'index.html';
        } catch (erro) { mensagem.textContent = erro.message; }
    });
}

const formSensibilidade = document.getElementById('formSensibilidade');
if (formSensibilidade) {
    const campoSensi = document.getElementById('sensibilidade');
    const resultado = document.getElementById('resultado');
    const listaHistorico = document.getElementById('listaHistorico');
    let sensibilidadeCalculada = [];

    async function carregarHistorico() {
        listaHistorico.replaceChildren();
        try {
            const resposta = await fetch('/historico/me', { cache: 'no-store' });
            if (resposta.status === 401) {
                window.location.replace('login.html');
                return;
            }
            if (!resposta.ok) throw new Error('Não foi possível carregar o histórico.');
            const registros = await resposta.json();
            if (registros.length === 0) {
                const item = document.createElement('li');
                item.textContent = 'Nenhum cálculo salvo ainda.';
                listaHistorico.appendChild(item);
                return;
            }
            registros.forEach(registro => {
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

    async function iniciarPagina() {
        try {
            const resposta = await fetch('/sessao', { cache: 'no-store' });
            if (!resposta.ok) {
                window.location.replace('login.html');
                return;
            }
            const dados = await resposta.json();
            document.getElementById('nomeUsuario').textContent = dados.usuario.nome;
            carregarHistorico();
        } catch {
            window.location.replace('login.html');
        }
    }

    formSensibilidade.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const valor = campoSensi.value.trim();
        const sensibilidade = Number(valor);
        if (valor === '' || !Number.isFinite(sensibilidade) || sensibilidade <= 0 || sensibilidade > 1000000) {
            resultado.textContent = 'Digite uma sensibilidade maior que zero e menor ou igual a 1.000.000.';
            return;
        }
        sensibilidadeCalculada = [sensibilidade * 0.5, sensibilidade, sensibilidade * 1.5];
        resultado.replaceChildren();
        sensibilidadeCalculada.forEach((numero, indice) => {
            const opcao = document.createElement('label');
            opcao.className = 'opcao-sensibilidade';
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'sensibilidadeSelecionada';
            radio.value = String(indice);
            radio.checked = indice === 1;
            const valorNumero = document.createElement('span');
            valorNumero.textContent = String(Number(numero.toPrecision(10)));
            opcao.append(radio, valorNumero);
            resultado.appendChild(opcao);
        });
        const botaoSalvar = document.createElement('button');
        botaoSalvar.type = 'button';
        botaoSalvar.id = 'salvarSensibilidade';
        botaoSalvar.textContent = 'Salvar';
        resultado.appendChild(botaoSalvar);

        botaoSalvar.addEventListener('click', async () => {
            const selecionada = resultado.querySelector('input[name="sensibilidadeSelecionada"]:checked');
            if (!selecionada) return;
            botaoSalvar.disabled = true;
            botaoSalvar.textContent = 'Salvando...';
            try {
                const valorSalvo = Number(sensibilidadeCalculada[Number(selecionada.value)].toPrecision(10));
                await enviarDados('/historico', { sensibilidade: valorSalvo });
                campoSensi.value = String(valorSalvo);
                await carregarHistorico();
                botaoSalvar.textContent = 'Salvo';
            } catch (erro) {
                botaoSalvar.disabled = false;
                botaoSalvar.textContent = 'Salvar';
                const aviso = document.createElement('p');
                aviso.textContent = erro.message;
                resultado.appendChild(aviso);
            }
        });
    });

    document.getElementById('sair').addEventListener('click', async () => {
        try { await enviarDados('/logout', {}); }
        finally { window.location.replace('login.html'); }
    });

    iniciarPagina();
}
