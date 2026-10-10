# Divisível

Este programa em Python recebe um número inteiro positivo e mostra seus divisores.

## Como funciona

O código testa os números de 1 até o valor informado. Quando a divisão não deixa resto, o número testado é um divisor e entra na lista de resultados.

A verificação usa o operador módulo (`%`):

```python
numero % divisor
```

Se o resultado for `0`, a divisão é exata.

## O que pratiquei

- Entrada e conversão de dados
- Laço `for`
- Condições
- Operador módulo
- Listas
- Tratamento de `ValueError`

## Como executar

Com Python 3 instalado, rode:

```bash
python divisivel.py
```

O projeto usa apenas recursos da biblioteca padrão do Python.

## Arquivos

```text
divisivel/
├── divisivel.py
└── README.md
```

## Licença

Este projeto usa a licença MIT do repositório principal.
