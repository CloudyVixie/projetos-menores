while True:
    try:
        divisivel = []
        param = int(input("insira um número: "))

        while param <= 0:
            print("\nERRO! O NÚMERO PRECISA SER POSITIVO E DIFERENTE DE 0!\n")
            param = int(input("insira um número positivo diferente de 0: "))
        
        for i in range(1, param+1):
            if param % i == 0:
                divisivel.append(i)
        print(f"Os divisores de {param} são:", *divisivel, sep=", ")
        break
    except ValueError:
        print("\nERRO! O VALOR INSERIDO DEVE SER NUMÉRICO E INTEIRO!\n")