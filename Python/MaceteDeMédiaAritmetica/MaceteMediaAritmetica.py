import random

tamanho_lista = random.randint(4, 10)
lista_numeros = []

for tamanho in range(tamanho_lista):
    item_lista = round(random.uniform(1, 199), 1)
    lista_numeros.append(item_lista)


def mostrar_lista():
    print("=== NÚMEROS DA LISTA ===")
    for numero in lista_numeros:
        print(numero)


def mostrar_lista_desvio():
    print("\n=== NÚMEROS DA LISTA DE DESVIO ===")
    for numero in lista_desvio:
        print(f"{numero:.2f}")


def mostrar_media_lista():
    media_numeros = sum(lista_numeros) / len(lista_numeros)

    print("\n=== MÉDIA DA LISTA ===")
    print(f"{media_numeros:.2f}")

    return media_numeros


def mostrar_media_lista_desvios():
    media_desvio = sum(lista_desvio) / len(lista_desvio)

    print("\n=== MÉDIA DOS DESVIOS ===")
    print(f"{media_desvio:.2f}")

    return media_desvio


mostrar_lista()

chute = float(input(
    "\nCom base nos números, chute qual é a média aritmética deles: "
))


lista_desvio = []

for numero in lista_numeros:
    lista_desvio.append(numero - chute)


media_numeros = mostrar_media_lista()

mostrar_lista_desvio()

media_desvio = mostrar_media_lista_desvios()

comprovacao = chute + media_desvio

print(f"\nO método dos desvios consiste em usar a média hipotética que chutamos lá no início ({chute}) e calcular o desvio para cada item da lista da média que queremos calcular. por fim, fazemos a média dos desvios e somamos ao número inicial. resultando na média")
print(f"\nMédia calculada pelo método dos desvios: {comprovacao:.2f}")

print(f"\n\nO método tradicional é basicamente somar todos os números e dividir pela quantidade")
print(f"\nMédia calculada pelo método tradicional: {media_numeros:.2f}")

print(f"\n\n====Por que usar o método dos desvios?====\nEm números grandes ou quebrados, ele ajuda a não se perder em contas. Já que somar números como 154.3, 94.6 e 125.2 e depois dividir se torna um trabalho maior")