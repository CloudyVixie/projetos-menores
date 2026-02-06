print("X1 - > Y1 \nX2 - > Y2")
print("Lembre-se de que X simboliza a razão, enquanto Y a proporção!")

x1 = float(input("Insira o numerador da razão (X1): "))
x2 = float(input("Insira o denominador da razão (X2): "))

print(f"{x1} - > Y1 \n{x2} - > Y2")

    

incognita = input("O que deseja descobrir da proporção? o denominador ou o numerador?: (D/N): ")
incognita.lower()
while incognita != "d" and incognita != "n":
    print("Resposta não identificada! Tente novamente!")
    incognita = input("O que deseja descobrir da proporção? o denominador ou o numerador?: (D/N): ")
if incognita == "d":
    y1 = float(input("Insira o numerador (Y1): "))
    y2 = (x2*y1)/x1
    print(f"RESULTADO:\n {x1} - > {y1} \n{x2} - > {y2}")
if incognita == "n":
    y2 = float(input("Insira o denominador (Y2): "))
    y1 = (x1*y2)/x2
    print(f"RESULTADO:\n {x1} - > {y1} \n{x2} - > {y2}")
