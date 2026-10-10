# Macete de Média Aritmética

Este projeto foi feito em Python para testar um jeito diferente de calcular a média. Em vez de somar todos os valores diretamente, o cálculo usa as diferenças entre cada número e um valor de referência.

## Como o cálculo funciona

Primeiro, escolhe-se um valor próximo da média esperada. Depois, calcula-se a diferença entre esse valor e cada número da lista. A média dessas diferenças é somada ao valor escolhido.

### Exemplo

Considere esta lista:

```python
[8.5, 7.3, 7.0, 7.5, 9.2, 8.4, 9.0, 7.2, 8.0, 9.5]
```

**1. Escolha um valor de referência**

Neste exemplo, o valor escolhido é `7.3`.

**2. Calcule as diferenças**

Subtraia `7.3` de cada número:

```text
 1.2,  0.0, -0.3,  0.2,  1.9,
 1.1,  1.7, -0.1,  0.7,  2.2
```

Os números acima de `7.3` geram diferenças positivas. Os que ficam abaixo geram diferenças negativas.

**3. Calcule a média das diferenças**

A soma das diferenças é `8.6`. Como a lista tem 10 números:

```text
8.6 / 10 = 0.86
```

**4. Encontre a média**

Some o resultado ao valor de referência:

```text
7.3 + 0.86 = 8.16
```

A média da lista é **8,16**, igual ao resultado do cálculo tradicional.

## Por que fiz esse projeto

A ideia foi testar um método que conheci em um vídeo e conferir se o resultado batia com a média comum. Também serviu para praticar cálculos e listas em Python.

## Referência

Usei este vídeo como referência para testar o método:

[Assistir ao vídeo no TikTok](https://vt.tiktok.com/ZSbsScYFo/)

## Como executar

É necessário ter Python 3 instalado. Execute o arquivo do projeto pelo terminal:

```bash
python MaceteDeMédiaAritmetica.py
```

## Tecnologias

- Python 3

## Licença

Este projeto está disponível sob a licença MIT. Consulte o arquivo `LICENSE` do repositório para ver os termos.
