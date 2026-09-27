# 🎯 Sensibility Finder

> Uma pequena ferramenta web para testar variações de sensibilidade em jogos de mira — feita em JavaScript, com uma interface simples e estilizada em CSS.

---

## ✨ Sobre o projeto

O **Sensibility Finder** nasceu de uma necessidade bem simples: encontrar uma sensibilidade que pudesse funcionar melhor para jogar.

Antes, quando precisava fazer esse tipo de cálculo, costumava criar um pequeno programa em **Python** para descobrir os valores. Desta vez, a ideia foi levar a mesma lógica para o navegador e aproveitar o projeto para praticar **JavaScript, manipulação do DOM e CSS**.

A ferramenta recebe uma **sensibilidade base** e gera duas variações:

| Opção | Cálculo | Resultado |
|---|---:|---|
| 🐢 **Baixa** | Base × 0.5 | 50% da sensibilidade |
| 🎯 **Atual** | Base | 100% da sensibilidade |
| ⚡ **Alta** | Base × 1.5 | 150% da sensibilidade |

Além de calcular os valores, a página permite aplicar diretamente as sensibilidades baixa ou alta no campo de entrada.

---

## 🖥️ Interface

A aplicação utiliza uma interface centralizada sobre uma imagem de fundo, com efeito de desfoque e elementos estilizados para deixar a experiência mais agradável.

O CSS também inclui **transições e efeito de escala nos botões ao passar o mouse**, tornando a interface um pouco mais dinâmica.

---

## 🧠 Como funciona

1. Digite sua **sensibilidade base**.
2. Clique em **Calcular**.
3. O JavaScript calcula:
   - `sensibilidade × 0.5`
   - `sensibilidade`
   - `sensibilidade × 1.5`
4. Os resultados são exibidos na página.
5. Caso queira testar uma das alternativas, basta clicar em **Usar sensibilidade baixa** ou **Usar sensibilidade alta**.

Tudo acontece no próprio navegador, sem servidor, banco de dados ou dependências externas.

---

## 🛠️ Tecnologias

| Tecnologia | Utilização |
|---|---|
| **HTML5** | Estrutura da página |
| **CSS3** | Layout, estilização, efeitos e animações |
| **JavaScript** | Cálculos, eventos e manipulação do DOM |

---

## 📂 Estrutura do projeto

```text
SensibilityFinder/
├── 📄 index.html
├── 📜 script.js
├── 🎨 style.css
├── 🖼️ base_background.png
└── 📖 README.md
```

### 📄 `index.html`

Responsável pela estrutura da aplicação:
- campo para informar a sensibilidade;
- botão de cálculo;
- área para exibir os resultados;
- botões para utilizar as sensibilidades alternativas.

### 📜 `script.js`

É onde fica a lógica da aplicação.

O JavaScript é responsável por:
- acessar elementos através do DOM;
- capturar a sensibilidade informada;
- realizar os cálculos;
- alterar o conteúdo dos elementos da página;
- controlar a visibilidade dos botões e divisores;
- aplicar uma nova sensibilidade diretamente no campo.

### 🎨 `style.css`

Cuida da aparência da página, utilizando recursos como:
- **Flexbox**;
- imagem de fundo;
- `backdrop-filter`;
- bordas arredondadas;
- sombras;
- transições;
- efeito `scale` nos botões;
- alinhamento e espaçamento dos elementos.

### 🖼️ `base_background.png`

Imagem utilizada como plano de fundo da aplicação.

---

## 🎓 O que este projeto pratica

Apesar de ser uma aplicação pequena, o projeto reúne alguns conceitos importantes de desenvolvimento web:
- manipulação do **DOM**;
- utilização de **eventos** em JavaScript;
- captura de valores de inputs;
- atualização dinâmica do HTML;
- cálculos utilizando JavaScript;
- estilização com **CSS**;
- criação de layouts com **Flexbox**;
- utilização de efeitos visuais com CSS.

---

## 🚀 Executando o projeto

Não é necessário instalar nada.

Basta clonar ou baixar o repositório e abrir:

```text
JavaScript/SensibilityFinder/index.html
```

em qualquer navegador moderno.

---

## 💡 Por que JavaScript?

A lógica utilizada aqui poderia continuar sendo feita em Python, como nos primeiros testes.

A diferença é que, utilizando JavaScript, o cálculo pode acontecer **diretamente na página**, permitindo transformar uma lógica simples em uma pequena ferramenta interativa.

Foi justamente essa mudança que tornou o projeto um exercício interessante: pegar algo que antes existia como um programa de terminal e transformar em uma aplicação web.

---

## 📌 Status

**Concluído.**

Projeto criado como parte dos estudos e experimentos de **JavaScript, HTML e CSS**.

---

### ☁️ Desenvolvido por CloudyVixie

Um projeto pequeno, mas feito para praticar e experimentar novas formas de transformar ideias simples em aplicações web.