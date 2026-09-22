import time
import os

class Produto:
    def __init__(self, nome, qtd, valor):
        self.nome = nome
        self.qtd = qtd
        self.valor = valor

    def formatar(self):
        return (
            f"Produto: {self.nome}\n"
            f"Quantidade: {self.qtd}\n"
            f"Valor: R${self.valor}\n"
            f"Total: R${self.qtd*self.valor:.2f}\n"
        )

lista = []
total_valores = []

while True:
    try:
        tamanho_lista = int(input("Insira quantos itens estarão na lista: "))

        for item_lista in range(tamanho_lista):
            nome = input("Nome do produto: " )
            valor = float(input("Valor: "))
            qtd = int(input("Quantidade: "))
            total = valor*qtd
            print("\n")

            produto = Produto(nome, qtd, valor)
            lista.append(produto)
            total_valores.append(total)
        
        with open("Lista.txt", "w", encoding="utf-8") as arquivo:
            for produto in lista:
                arquivo.write(produto.formatar())
                arquivo.write("\n")


            total = sum(total_valores)
            arquivo.write(f"Somatório geral: {total:.2f}")
        break


    except ValueError:
        os.system("cls")
        print("Você tentou inserir letras onde só pode número! ")
        time.sleep(3)
        continue
