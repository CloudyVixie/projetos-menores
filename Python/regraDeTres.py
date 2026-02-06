print("\n==========")
print("X1 - > Y1 \nX2 - > Y2")
print("==========")
print("\nLembre-se de que X simboliza a razão, enquanto Y a proporção!")

# Volta o código do início toda vez que há um erro
while True:
    try:
        x1 = float(input("Insira o numerador da razão (X1): "))
        x2 = float(input("Insira o denominador da razão (X2): "))

        print("\n==========")
        print(f"{x1} - > Y1 \n{x2} - > Y2")
        print("==========")

        incognita = input("\nO que deseja descobrir da proporção? O numerador(Y1) ou denominador(Y2)?: (n/d): ")
        incognita.lower()


# Repetição caso a resposta seja diferente do que a desejada
        while incognita != "d" and incognita != "n":
            print("Resposta não identificada! Tente novamente!")
            incognita = input("O que deseja descobrir da proporção? O numerador(Y1) ou denominador(Y2)?: (n/d): ")

# Condicionais para a descoberta do denominador (número de baixo) ou numerador (numero de cima)
        if incognita == "d":
            y1 = float(input("Insira o numerador (Y1): "))
            y2 = (x2*y1)/x1
            print(f"RESULTADO:\n {x1} - > {y1} \n{x2} - > {y2}")
        elif incognita == "n":
            y2 = float(input("Insira o denominador (Y2): "))
            y1 = (x1*y2)/x2
            print(f"RESULTADO:\n {x1} - > {y1} \n{x2} - > {y2}")
            
# Caso até aqui não haja nenhum erro, sai do "While True" lá do começo
            break
        
# Capta o erro de quando é inserido um valor do tipo errado (geralmente strings).
    except ValueError:
        print("\nVocê está inserindo texto onde só entra números! Vamos voltar ao início \n")
