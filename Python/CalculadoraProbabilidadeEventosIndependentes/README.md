# Calculadora de Probabilidade

Uma calculadora de terminal feita em Python para estimar quantas tentativas são necessárias para atingir uma chance acumulada desejada.

## Como funciona

Informe a chance de sucesso em uma tentativa e a chance acumulada que deseja alcançar. O programa calcula o número de tentativas considerando que os eventos são independentes.

O cálculo usa logaritmos para encontrar a quantidade necessária e arredonda o resultado para cima, garantindo um número inteiro de tentativas.

## O que pratiquei

- Variáveis e entrada de dados
- Validação de valores
- Condições e laços
- Tratamento de erros com `try/except`
- `math.log()` e `math.ceil()`
- Uso do módulo `os`

## Como executar

Com Python 3 instalado, rode:

```bash
python CalculadoraProbabilidadeEventosIndependentes.py
```

O projeto usa apenas recursos da biblioteca padrão do Python.

## Arquivos

```text
CalculadoraProbabilidadeEventosIndependentes/
├── CalculadoraProbabilidadeEventosIndependentes.py
└── README.md
```

## Licença

Este projeto usa a licença MIT do repositório principal.
