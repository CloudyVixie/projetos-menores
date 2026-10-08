
lista_numeros = [8.5, 7.3, 7.0, 7.5, 9.2, 8.4, 9.0, 7.2, 8.0, 9.5]
def mostrar_lista():
    print("=== NÚMEROS DA LISTA ===")
    for numero in lista_numeros:
        print(numero)






chute = 7.6
lista_desvio = []

for numero in lista_numeros:
    lista_desvio.append(numero-chute)


mostrar_lista()
    
media_numeros = sum(lista_numeros) / len(lista_numeros)
print("=== soma da lista ===")
print(f"{media_numeros:.2f}")

print("\n=== NÚMEROS DA LISTA DE DESVIO ===")
for numero in lista_desvio:
    print(f"{numero:.2f}")

media_desvio = sum(lista_desvio) / len(lista_desvio)
print("=== soma da lista de desvios ===")
print(f"{media_desvio:.2f}")

comprovacao = chute + media_desvio



print(f"\nMédia calculada pelo método dos desvios: {comprovacao:.2f} \n")
print(f"Média calculada pelo método tradicional: {media_numeros:.2f} \n")
