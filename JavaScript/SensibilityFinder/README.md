# Sensibility Finder

Um pequeno projeto web desenvolvido para encontrar uma faixa de sensibilidade para jogos de mira a partir de uma sensibilidade base.

## Sobre o projeto

Sempre que precisava encontrar uma sensibilidade nova para jogar, costumava criar um pequeno programa em **Python** para fazer os cálculos. Neste projeto, a ideia foi transformar esse processo em uma página web e experimentar a mesma lógica utilizando **JavaScript**.

A página recebe uma sensibilidade base e apresenta duas alternativas:

- **Sensibilidade baixa:** 50% da sensibilidade informada.
- **Sensibilidade atual:** mantém o valor informado.
- **Sensibilidade alta:** 150% da sensibilidade informada.

Além da parte lógica, o projeto também foi utilizado como uma forma de praticar **HTML e CSS**, criando uma interface mais agradável em vez de deixar o mecanismo apenas como um programa de terminal.

## Tecnologias utilizadas

- **HTML5** — estrutura da página.
- **CSS3** — estilização, layout, fundo, efeito de desfoque e animações.
- **JavaScript** — lógica dos cálculos e interação com os elementos da página.

## Como funciona

1. Informe a sensibilidade atual no campo de entrada.
2. Clique em **Calcular**.
3. O sistema apresenta três possibilidades:
   - sensibilidade reduzida para 50%;
   - sensibilidade atual;
   - sensibilidade aumentada para 150%.
4. Os botões **Usar sensibilidade baixa** e **Usar sensibilidade alta** permitem aplicar diretamente uma das alternativas ao campo de sensibilidade.

Os cálculos são realizados diretamente no navegador, sem necessidade de servidor ou dependências externas.

## Estrutura

```text
SensibilityFinder/
├── index.html
├── script.js
├── style.css
├── base_background.png
└── README.md
```

### `index.html`

Responsável pela estrutura da interface, incluindo o campo de sensibilidade, botão de cálculo e opções de sensibilidade.

### `script.js`

Contém toda a lógica do projeto. Utiliza JavaScript para:

- capturar valores através do DOM;
- realizar os cálculos;
- atualizar os textos da página;
- controlar a exibição dos elementos;
- aplicar as sensibilidades escolhidas diretamente no campo de entrada.

### `style.css`

Responsável pela aparência da aplicação, incluindo:

- centralização da interface;
- layout com Flexbox;
- imagem de fundo;
- efeito de `backdrop-filter`;
- bordas arredondadas;
- sombras;
- transições;
- efeito de aumento dos botões ao passar o mouse.

### `base_background.png`

Imagem utilizada como plano de fundo da página.

## Objetivo

O objetivo principal não foi criar uma ferramenta complexa, mas transformar uma pequena ferramenta que anteriormente era feita em Python em uma aplicação web funcional.

O projeto também serviu como exercício prático para consolidar conhecimentos em **JavaScript, manipulação do DOM e CSS**, principalmente na criação de uma interface que acompanha a lógica do programa.

## Execução

Por ser um projeto totalmente desenvolvido no lado do cliente, basta abrir o arquivo `index.html` em um navegador.

Nenhuma instalação ou configuração adicional é necessária.

---

Projeto desenvolvido por **CloudyVixie** como parte dos estudos e experimentos com desenvolvimento web.
