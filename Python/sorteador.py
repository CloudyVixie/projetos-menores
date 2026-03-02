
import random
opcoes = ["1", "2"]

def opcnome():
    nomes = []
    nomesSorteados = []
    
    while True:
        try:
            qtd = int(input("Insira a quantia de nomes a ser inserida\n-> "))
            qtdEscolhida = int(input(f"Insira quantos nomes você deseja sortear em meio a {qtd} nomes\n-> "))
            if qtdEscolhida <= 0:
                print("a quantidade escolhida não pode ser menor ou igual a 0!")
                continue
            break
        except ValueError:
            print("Insira apenas números!")
            
    for i in range(qtd):
        nome = input(f"Insira o {i+1}º nome: ")
        
        if nome in nomes:
            while True:
                opcao = input("Deseja adicionar esse nome novamente?\n[1] - SIM \n[2] - NÃO\n-> ")
                if opcao not in opcoes:
                    print("Opção inválida!")
                    continue
                elif opcao == "1":
                    nomes.append(nome)
                    print("Nome adicionado!")
                    break
                elif opcao == "2":
                    print("Nenhum nome adicionado!")
                    break
                else:      
                    nomes.append(nome)
        print("Nome adicionado!")
        
    nomesSorteados = random.choice(nome*qtdEscolhida)  
    if qtdEscolhida > 1:
        print(f"A lista gerada possui {len(nomes)} nomes. Sendo eles {nomes}. Os nomes escolhidos foram {nomesSorteados}")
    elif qtdEscolhida == 1:
        print(f"A lista gerada possui {len(nomes)} nomes. Sendo eles {nomes}. O nome escolhido foi {nomesSorteados}")
       
def opcnumero():
    numeros = []
    numerosSorteados = []
    while True:
        opcao = input("Deseja sortear números em um raio (Ex.: 0 a 10) ou números específicos?\n[1] - EM RAIO \n[2] - ESPECÍFICOS\n-> ")
        if opcao not in opcoes:
            print("Opção inválida!")
        else:
            break
    
    if opcao == "1":
        while True:
            try:
                numInicialRaio = int(input("Insira o número inicial do raio\n-> "))
                numFinalRaio = int(input("Insira o número final do raio\n-> "))
                qtdEscolhida = int(input(f"Quantos números deseja sortear em meio ao intervalo {numInicialRaio}~{numFinalRaio}?\n-> "))
                
                if numInicialRaio > numFinalRaio:
                    print(f"O número inicial não pode ser maior do que o final (o contador não pode ir de {numInicialRaio} a {numFinalRaio})!")
                    continue
                elif numFinalRaio < 0 or numInicialRaio < 0:
                    print("O número inicial e o número final não podem ser negativos!")
                    continue
                elif qtdEscolhida <= 0:
                    print("A quantia sorteada não pode ser menor ou igual a zero!")
                    continue
                for i in range(qtdEscolhida):
                    numerosSorteados.append(random.randint(numInicialRaio,numFinalRaio))
                break
            except:
                print("Insira somente números inteiros e positivos!")
        
        print(f"O intervalo foi de {numInicialRaio} a {numFinalRaio}. E os números sorteados foram {numerosSorteados}!")
    elif opcao == "2":
        while True:
            try:
                qtd = int(input("Insira a quantia de números a ser inserida\n-> "))
                qtdEscolhida = int(input(f"Insira quantos números deseja sortear em meio a {qtd} números\n-> "))
                if qtd <= 0:
                    print("A quantidade escolhida não pode ser menor ou igual a 0!")
                    continue
                break
            except:
                print("Insira apenas números!")
                
        for i in range(qtd):
            numero = str(input(f"Insira o {i+1}º número\n-> "))
            
            if numero in numeros:
                opcao = input("Deseja adicionar esse numero novamente?\n[1] - SIM \n[2] - NÃO\n-> ")
                
            if opcao not in opcoes:
                print("OPÇÃO INVÁLIDA!")
                continue
            elif opcao == "1":
                numeros.append(numero)
                print("Número adicionado!")
            elif opcao == "2":
                print("Nenhum número adicionado!")
                
            numeros.append(numero)
        
                     
        numerosSorteados.append(random.choice(numeros*qtdEscolhida))
        
        if qtdEscolhida > 1:
            print(f"A lista gerada possui {len(numeros)} numeros. Sendo eles {numeros}. Os números escolhidos foram {numerosSorteados}")
        elif qtdEscolhida == 1:
            print(f"A lista gerada possui {len(numeros)} numeros. Sendo eles {numeros}. O número escolhido foi {numerosSorteados}")

print("==== SEJA BEM VINDO AO SORTEADOR! ====")
opcao = input("Selecione uma das opções abaixo: \n[1] - NÚMEROS \n[2] - NOMES\n-> ")
while True:
        if opcao not in opcoes:
            print("Opção inválida!")
            continue
        else:
            break
if opcao == "1":
    opcnumero()
elif opcao == "2":
    opcnome()
    
        

            
