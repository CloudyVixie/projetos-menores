# 🎯 Sensibility Finder

Uma pequena ferramenta web para testar valores de sensibilidade em jogos de mira.

O projeto foi feito com HTML, CSS e JavaScript.

## ☁️ Sobre

Antes deste projeto, cálculos desse tipo eram feitos em pequenos scripts Python.

A ideia foi levar o mesmo cálculo para uma página web simples e interativa.

A ferramenta recebe uma sensibilidade base e cria três valores:

| Opção | Cálculo | Resultado |
| --- | --- | --- |
| Baixa | Base × 0.5 | 50% da base |
| Atual | Base | 100% da base |
| Alta | Base × 1.5 | 150% da base |

Também é possível colocar um dos valores direto no campo de sensibilidade.

## 🧠 Como funciona

1. Informe a sensibilidade base.
2. Clique em **Calcular**.
3. A página calcula os três valores.
4. Os resultados aparecem na tela.
5. Use os botões para testar uma das opções.

Tudo roda no navegador, sem servidor ou banco de dados.

## 🖥️ Interface

A página usa uma imagem de fundo com efeitos feitos em CSS.

Os botões também usam transições e efeito de escala ao passar o mouse.

## 🛠️ Tecnologias

| Tecnologia | Uso |
| --- | --- |
| HTML5 | Estrutura da página |
| CSS3 | Layout e efeitos |
| JavaScript | Cálculos e eventos |

## 📂 Estrutura

```text
SensibilityFinder/
├── index.html
├── script.js
├── style.css
├── base_background.png
└── README.md
```

## 🎓 Conceitos praticados

- Manipulação do DOM
- Eventos
- Inputs
- Cálculos com JavaScript
- Flexbox
- Efeitos de CSS
- Atualização de conteúdo

## ▶️ Executando

Não é preciso instalar nada.

Abra `index.html` em um navegador moderno.

## 📄 Licença

Este projeto usa a licença MIT do repositório principal.
