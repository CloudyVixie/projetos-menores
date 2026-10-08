# Macete de Média Aritmética

Projeto em Python para testar um método alternativo de calcular a média aritmética usando desvios em relação a um valor hipotético.

## Como funciona?

A ideia é escolher um número próximo da média esperada e calcular a diferença entre esse valor e cada elemento da lista. Depois, basta calcular a média dos desvios e somar o resultado ao número escolhido.

Esse método pode facilitar cálculos com muitos valores, reduzindo a necessidade de somar todos os números diretamente.

### Exemplo prático

Considere a seguinte lista:

```python
[8.5, 7.3, 7.0, 7.5, 9.2, 8.4, 9.0, 7.2, 8.0, 9.5]
```

**1. Escolha um valor hipotético**

Neste exemplo, o valor escolhido é `7.3`.

**2. Calcule os desvios**

Subtraia `7.3` de cada elemento da lista:

```text
 1.2,  0.0, -0.3,  0.2,  1.9,
 1.1,  1.7, -0.1,  0.7,  2.2
```

Valores acima de `7.3` geram desvios positivos. Valores abaixo geram desvios negativos.

**3. Calcule a média dos desvios**

A soma dos desvios é `8.6`. Como existem 10 valores:

```text
8.6 / 10 = 0.86
```

**4. Encontre a média aritmética**

Some a média dos desvios ao valor hipotético:

```text
7.3 + 0.86 = 8.16
```

O resultado é **8,16**, a mesma média obtida pelo cálculo tradicional.

## Objetivo

- Praticar conceitos de matemática com Python.
- Compreender uma alternativa ao cálculo tradicional da média.
- Verificar o resultado do método por meio de um exemplo.
- Explorar formas de simplificar cálculos matemáticos.

## Referência

O método foi conhecido por meio de um vídeo no TikTok, utilizado como referência para testar o cálculo.

[Assistir ao vídeo utilizado como referência](https://vt.tiktok.com/ZSbsScYFo/)

## Tecnologias

- Python 3

## Licença

Este projeto está disponibilizado sob a licença MIT. Consulte o arquivo `LICENSE` do repositório para conhecer os termos de uso.
