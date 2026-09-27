# ➗ Divisível

> Programa para encontrar todos os divisores de um número inteiro positivo.

## ✨ Sobre o projeto

O usuário informa um número e o programa verifica quais valores, entre `1` e o próprio número, conseguem dividi-lo exatamente.

O resultado é apresentado com os divisores encontrados.

## 🔎 Como funciona

Para cada valor do intervalo, o programa utiliza o operador módulo:

```python
numero % divisor
```

Quando o resultado é `0`, a divisão é exata e o valor é considerado um divisor.

## 🧠 Conceitos praticados

- `input()`
- Conversão para `int`
- Laço `for`
- Estruturas condicionais
- Operador módulo `%`
- Listas
- Validação de entrada
- `ValueError`

## ▶️ Execução

```bash
python divisivel.py
```

## 🛠️ Tecnologia

![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)

Projeto desenvolvido utilizando apenas recursos da biblioteca padrão.

## 📁 Estrutura

```
divisivel/
├── divisivel.py
└── README.md
```

---

🔢 **Projeto de estudo** — exercício focado em lógica, operadores matemáticos e estruturas de repetição.