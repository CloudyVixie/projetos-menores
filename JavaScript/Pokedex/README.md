# Pokédex

Uma aplicação simples que consulta informações de Pokémon pela PokéAPI e apresenta o número na Pokédex, o nome, os tipos e a imagem.

## Por que fiz esse projeto

Fiz a aplicação para praticar o consumo de uma API REST e entender como acessar e manipular os dados recebidos em formato JSON usando JavaScript.

## Como o código funciona

- A pessoa informa o nome ou número de um Pokémon.
- O JavaScript faz uma requisição à PokéAPI usando `fetch()`.
- A resposta é convertida para JSON com `response.json()`.
- Os dados necessários são acessados no objeto retornado.
- O DOM é atualizado para mostrar as informações e a imagem do Pokémon.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- [PokéAPI](https://pokeapi.co/)

## Uso de inteligência artificial

A aplicação e sua lógica foram desenvolvidas para praticar consumo de API REST e manipulação de JSON. A inteligência artificial foi utilizada única e exclusivamente para criar a estilização em CSS. A lógica original em JavaScript não foi feita pela IA.

## Estrutura

```
Pokedex/
├── index.html
├── script.js
├── style.css
└── README.md
```
