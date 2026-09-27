import math
import time
import os

print("=======Instrução com cenáro hipotético=======")
print("Imagine que há uma roleta e nessa roleta há 7% de chance de adquirir o prêmio máximo. E com isso, você pretende descobrir quantas tentativas precisa para adquirir o item (lembre-se de que 100% de chance é impossível). Primeiro, insira a porcentagem de chance de adquirir o prêmio. nesse caso, 7%. Logo após, insira o objetivo. Como queremos o máximo de certeza de adquirir o prêmio, inserimos 99%. O programa calculará quantas tentativas levará para que seja estatisticamente certo de adquirir o prêmio")
print("\n")


continuar = True

def calcularTentativas(porcentagemAcerto, porcentagemDesejada):
    resultado = (math.log(1 - porcentagemDesejada, 10)/math.log(1 - porcentagemAcerto,10))
    print(f"Para alcançar um objetivo de {porcentagemAcerto*100}% de chance de obtenção com {porcentagemDesejada*100}% de chance de acerto, são necessárias {math.ceil(resultado)} tentativas")

while continuar:
    try:
        porcentagemAcerto = (float(input("Insira a porcentagem de chance de dar certo (Ex.: Item com 5% de chance de obtenção): "))/100)
        porcentagemDesejada = (float(input("Insira a porcentagem desejada de sucesso do evento (Ex.: Quero 99% de chance de conseguir): "))/100)

        if porcentagemAcerto <= 0 or porcentagemDesejada <= 0:
            print("As porcentagens precisam ser maiores que 0%")
            time.sleep(2)
            os.system("cls")
            continue

        if porcentagemAcerto >= 1 or porcentagemDesejada >= 1:
            print("Não é possível calcular com 100% ou mais de chance")
            time.sleep(2)
            os.system("cls")
            continue

    except ValueError: 
        print("Insira apenas números!!")
        print("\n")
        time.sleep(2)
        os.system("cls")
        continue

    calcularTentativas(porcentagemAcerto, porcentagemDesejada)
    print("\n")

    while True:
        decisao = input("Deseja continuar? (S/N): ")
        decisao.lower()

        if decisao == "s":
            continuar = True
            print("\n")
            break
        
        elif decisao == "n":
            os.system("cls")
            print("Obrigado por usar!")
            time.sleep(2)
            continuar = False
            break
        else:
            print("Apenas insira 'S' para SIM ou 'N' para NÃO!")
            print("\n\n")
            continue
    



