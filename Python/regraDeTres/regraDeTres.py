print("\n==========\nX1 - > Y1 \nX2 - > Y2\n==========")
print("\nLembre-se de que X simboliza a razão, enquanto Y a proporção!")


# Faz com que se repita o trecho do código em caso de erros que fariam o tudo quebrar // Não estou utilizando if pois ainda não encontrei uma solução que impeça o programa de cair no ValueError utilizando if
while True:
    try:
        x1 = float(input("Insira o valor de X1: "))
        x2 = float(input("Insira o valor de X2: "))
        break
    except:
        print("\nUm dos valores está no formato incorreto! vamos tentar novamente do início!\n\n")

print(f"\n==========\n{x1} - > Y1 \n{x2} - > Y2\n==========")


# Criei funções para diminuir a quantia de código lá em baixo e caso queira mudar algo, eu posso alterar diretamente na própria função sem alterar todo o resto
def calcularDenominador(y1):
    y2 = (x2*y1)/x1
    print(f"\n==========\n{x1} - > {y1} \n{x2} - > {y2}\n==========")

def calcularNumerador(y1):
    y1 = y1 = (x1*y2)/x2
    print(f"\n==========\n{x1} - > {y1} \n{x2} - > {y2}\n==========")


incognita = input("Você deseja descobrir o numerador(Y1) ou o denominador(Y2)? (n/d): ")
# ".lower()" faz com que não importe se é inserido o texto em maiúsculo ou minúsculo. porque no fim, será transformado em minúsculo universalmente
incognita.lower()


# Aqui fiz um loop pra caso o usuário insira algo diferente do esperado. Acabou não sendo necessário usar Try e Except pois não há indicador de tipo de variável (como "float(input)"), logo, qualquer coisa inserida no input é lida como String(texto). Até mesmo os números
while incognita != "n" and incognita != "d":
    print("\nResposta fora dos parâmetros esclarecidos! Responda com 'D' para denominador ou 'N' para numerador! ")
    incognita = input("Você deseja descobrir o numerador(Y1) ou o denominador(Y2)? (n/d): ")
    incognita.lower()

# Aqui é necessário usar um Try e Except pois a variável "y2" utiliza um Input no formato Float, ou seja, inserir qualquer outro tipo de caractere ocasionará em ValueError
if incognita == "n":
    while True:
        try:
            y2 = float(input("Insira o denominador(Y2): "))
            break
        # Coloquei "ValueError" no Except justamente pra quando der esse erro em específico, mostrar a mensagem que quero. Caso apareça outro tipo de erro, o terminal vai dizer qual é, e então criarei outro Except para o erro posterior (caso haja)
        except ValueError:
            print("\nVocê deve inserir apenas números! Vamos tentar novamente...\n")       
    calcularNumerador(y2)
    
elif incognita == "d":
    while True:
        try:
            y1 = float(input("Insira o numerador(Y1): "))
            break
        except ValueError:
            print("\nVocê deve inserir apenas números! Vamos tentar novamente...\n")
    calcularDenominador(y1)