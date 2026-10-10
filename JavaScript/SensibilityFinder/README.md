# Sensibility Finder

Uma página simples para calcular variações de sensibilidade em jogos de mira. O projeto usa HTML, CSS e JavaScript e roda direto no navegador.

## Por que fiz esse projeto

Antes, eu fazia esse tipo de cálculo com pequenos scripts em Python. A ideia foi transformar o cálculo em uma página que desse para usar sem abrir um programa separado.

## Como funciona

Informe a sensibilidade base e clique em **Calcular**. A página mostra três opções:

| Opção | Cálculo | Resultado |
| --- | --- | --- |
| Baixa | Base × 0,5 | Metade do valor inicial |
| Atual | Base | O próprio valor inicial |
| Alta | Base × 1,5 | Uma vez e meia o valor inicial |

Os botões permitem colocar a opção baixa ou alta diretamente no campo, para testar outro valor sem digitá-lo manualmente.

Todo o cálculo acontece no navegador. Não há servidor nem banco de dados.

## Como executar

Não é preciso instalar dependências. Abra o arquivo `index.html` em um navegador moderno.

## Como o código está organizado

- `index.html`: contém o campo de entrada, o botão de cálculo e os espaços para mostrar os resultados.
- `script.js`: calcula as variações e atualiza os elementos da página.
- `style.css`: organiza a interface, o fundo e os efeitos dos botões.
- `base_background.png`: imagem usada no fundo da página.

## O que pratiquei

- Manipulação do DOM
- Eventos de clique
- Leitura de valores de um campo
- Cálculos com JavaScript
- Flexbox e efeitos de CSS

## Licença

Este projeto usa a licença MIT do repositório principal.
