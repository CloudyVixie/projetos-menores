import random

# def separadorDeLista():
#     champions = input("Insira a lista separando os itens por vírgula: ")
#     separador = champions.split(", ")

#     textoSeparado = ""
#     for i in separador:
#         textoSeparado += f'"{i}", '
#     print(textoSeparado[:-2])

# separadorDeLista()


# top = ["Aatrox", "Akali", "Ambessa", "Camile", "Cassiopeia", "Cho'Gath", "Darius","Dr. Mundo","Fiora", "Gangplank", "Garen", "Gnar", "Gragas", "Gwen", "Heimerdinger", "Illaoi", "Irelia", "Jax", "Jayce", "K’Sante", "Kayle", "Kennen", "Kled", "Malphite", "Maokai", "Mordekaiser", "Nasus", "Olaf", "Ornn", "Pantheon", "Poppy", "Quinn", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Sett", "Shen", "Singed", "Sion", "Tahm Kench", "Teemo", "Trundle", "Tryndamere", "Urgot", "Vladimir", "Volibear", "Warwick", "Wukong", "Yasuo", "Yone", "Yorick", "Zac"]

# jungle = ["Amumu", "Bel’Veth", "Briar", "Diana", "Ekko", "Elise", "Evelynn", "Fiddlesticks", "Gragas", "Graves", "Hecarim", "Ivern", "Jarvan IV", "Karthus", "Kha’Zix", "Kindred", "Lee Sin", "Lillia", "Master Yi", "Naafiri", "Nidalee", "Nocturne", "Nunu & Willump", "Olaf", "Poppy", "Rammus", "Rek’Sai", "Rengar", "Sejuani", "Shaco", "Skarner", "Taliyah" , "Trundle", "Udyr", "Vi", "Viego", "Volibear", "Warwick", "Wukong", "Xin Zhao", "Zac"]

# mid = ["Ahri", "Akali", "Akshan", "Annie", "Anivia", "Aurelion Sol", "Aurora", "Azir", "Cassiopeia", "Corki", "Diana", "Ekko", "Fizz", "Galio", "Hwei", "Irelia", "Jayce", "Kassadin", "Katarina", "LeBlanc", "Lissandra", "Lux", "Malzahar", "Naafiri", "Neeko", "Orianna", "Qiyana", "Ryze", "Sylas", "Syndra", "Taliyah", "Talon", "Twisted Fate", "Veigar", "Vel’Koz", "Viktor", "Vladimir", "Xerath", "Yasuo", "Yone", "Zed", "Ziggs", "Zoe"]

# adc = ["Aphelios", "Ashe", "Caitlyn", "Corki", "Draven", "Ezreal", "Jhin", "Jinx", "Kai’Sa", "Kalista", "Kog’Maw", "Lucian", "Miss Fortune", "Nilah", "Samira", "Senna", "Sivir", "Smolder", "Tristana", "Twitch", "Varus", "Vayne", "Xayah", "Yasuo", "Ziggs", "Zeri"]

# sup = ["Alistar", "Bard", "Blitzcrank", "Braum", "Brand", "Janna", "Karma", "Leona", "Lulu", "Lux", "Milio", "Morgana", "Nami", "Nautilus", "Neeko", "Pantheon", "Pike", "Rakan", "Rell", "Renata Glasc", "Senna", "Seraphine", "Sona", "Soraka", "Swain", "Tahm Kench", "Taric", "Thresh", "Vel’Koz", "Xerath", "Yuumi", "Zilean", "Zyra"]






roles = {
        "top" : ["Aatrox", "Akali", "Ambessa", "Camile", "Cassiopeia", "Cho'Gath", "Darius","Dr. Mundo","Fiora", "Gangplank", "Garen", "Gnar", "Gragas", "Gwen", "Heimerdinger", "Illaoi", "Irelia", "Jax", "Jayce", "K’Sante", "Kayle", "Kennen", "Kled", "Malphite", "Maokai", "Mordekaiser", "Nasus", "Olaf", "Ornn", "Pantheon", "Poppy", "Quinn", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Sett", "Shen", "Singed", "Sion", "Tahm Kench", "Teemo", "Trundle", "Tryndamere", "Urgot", "Vladimir", "Volibear", "Warwick", "Wukong", "Yasuo", "Yone", "Yorick", "Zac"], 
         
         "jungle" : ["Amumu", "Bel’Veth", "Briar", "Diana", "Ekko", "Elise", "Evelynn", "Fiddlesticks", "Gragas", "Graves", "Hecarim", "Ivern", "Jarvan IV", "Karthus", "Kha’Zix", "Kindred", "Lee Sin", "Lillia", "Master Yi", "Naafiri", "Nidalee", "Nocturne", "Nunu & Willump", "Olaf", "Poppy", "Rammus", "Rek’Sai", "Rengar", "Sejuani", "Shaco", "Skarner", "Taliyah" , "Trundle", "Udyr", "Vi", "Viego", "Volibear", "Warwick", "Wukong", "Xin Zhao", "Zac"], 

         "mid" : ["Ahri", "Akali", "Akshan", "Annie", "Anivia", "Aurelion Sol", "Aurora", "Azir", "Cassiopeia", "Corki", "Diana", "Ekko", "Fizz", "Galio", "Hwei", "Irelia", "Jayce", "Kassadin", "Katarina", "LeBlanc", "Lissandra", "Lux", "Malzahar", "Naafiri", "Neeko", "Orianna", "Qiyana", "Ryze", "Sylas", "Syndra", "Taliyah", "Talon", "Twisted Fate", "Veigar", "Vel’Koz", "Viktor", "Vladimir", "Xerath", "Yasuo", "Yone", "Zed", "Ziggs", "Zoe"], 

         "adc" : ["Aphelios", "Ashe", "Caitlyn", "Corki", "Draven", "Ezreal", "Jhin", "Jinx", "Kai’Sa", "Kalista", "Kog’Maw", "Lucian", "Miss Fortune", "Nilah", "Samira", "Senna", "Sivir", "Smolder", "Tristana", "Twitch", "Varus", "Vayne", "Xayah", "Yasuo", "Ziggs", "Zeri"], 

         "sup" : ["Alistar", "Bard", "Blitzcrank", "Braum", "Brand", "Janna", "Karma", "Leona", "Lulu", "Lux", "Milio", "Morgana", "Nami", "Nautilus", "Neeko", "Pantheon", "Pike", "Rakan", "Rell", "Renata Glasc", "Senna", "Seraphine", "Sona", "Soraka", "Swain", "Tahm Kench", "Taric", "Thresh", "Vel’Koz", "Xerath", "Yuumi", "Zilean", "Zyra"],

         "tudo" : ["Aatrox", "Akali", "Ambessa", "Camile", "Cassiopeia", "Cho'Gath", "Darius","Dr. Mundo","Fiora", "Gangplank", "Garen", "Gnar", "Gragas", "Gwen", "Heimerdinger", "Illaoi", "Irelia", "Jax", "Jayce", "K’Sante", "Kayle", "Kennen", "Kled", "Malphite", "Maokai", "Mordekaiser", "Nasus", "Olaf", "Ornn", "Pantheon", "Poppy", "Quinn", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Sett", "Shen", "Singed", "Sion", "Tahm Kench", "Teemo", "Trundle", "Tryndamere", "Urgot", "Vladimir", "Volibear", "Warwick", "Wukong", "Yasuo", "Yone", "Yorick", "Zac", "Amumu", "Bel’Veth", "Briar", "Diana", "Ekko", "Elise", "Evelynn", "Fiddlesticks", "Gragas", "Graves", "Hecarim", "Ivern", "Jarvan IV", "Karthus", "Kha’Zix", "Kindred", "Lee Sin", "Lillia", "Master Yi", "Naafiri", "Nidalee", "Nocturne", "Nunu & Willump", "Olaf", "Poppy", "Rammus", "Rek’Sai", "Rengar", "Sejuani", "Shaco", "Skarner", "Taliyah" , "Trundle", "Udyr", "Vi", "Viego", "Volibear", "Warwick", "Wukong", "Xin Zhao", "Zac", "Ahri", "Akali", "Akshan", "Annie", "Anivia", "Aurelion Sol", "Aurora", "Azir", "Cassiopeia", "Corki", "Diana", "Ekko", "Fizz", "Galio", "Hwei", "Irelia", "Jayce", "Kassadin", "Katarina", "LeBlanc", "Lissandra", "Lux", "Malzahar", "Naafiri", "Neeko", "Orianna", "Qiyana", "Ryze", "Sylas", "Syndra", "Taliyah", "Talon", "Twisted Fate", "Veigar", "Vel’Koz", "Viktor", "Vladimir", "Xerath", "Yasuo", "Yone", "Zed", "Ziggs", "Zoe", "Aphelios", "Ashe", "Caitlyn", "Corki", "Draven", "Ezreal", "Jhin", "Jinx", "Kai’Sa", "Kalista", "Kog’Maw", "Lucian", "Miss Fortune", "Nilah", "Samira", "Senna", "Sivir", "Smolder", "Tristana", "Twitch", "Varus", "Vayne", "Xayah", "Yasuo", "Ziggs", "Zeri", "Alistar", "Bard", "Blitzcrank", "Braum", "Brand", "Janna", "Karma", "Leona", "Lulu", "Lux", "Milio", "Morgana", "Nami", "Nautilus", "Neeko", "Pantheon", "Pike", "Rakan", "Rell", "Renata Glasc", "Senna", "Seraphine", "Sona", "Soraka", "Swain", "Tahm Kench", "Taric", "Thresh", "Vel’Koz", "Xerath", "Yuumi", "Zilean", "Zyra"]
         }


opcoes = {"1" : "top",
           "2" : "jungle",
           "3" : "mid",
           "4" : "adc",
           "5" : "sup",
           "6" : "tudo",
           "7" : "aleatório"}

champions = []


while True:
    try:
        painel = str(input("[1] - Top \n[2] - Jungle \n[3] - Mid \n[4] - Adc \n[5] - Sup  \n[6] - Tudo\n[7] - Aleatório\n -> " ))
        if painel not in opcoes:
            print("Opção fora dos parâmetros!\nTente novamente!\n\n")
            continue
        break
    except:
        print("Errou nas opções aí...")
        continue


if painel == "7":
    roleSorteada = (random.choice(list(roles.keys())))
    roleEscolhida = roleSorteada
    print(f"A role sorteada foi {roleEscolhida}!\n")

else: 
    roleEscolhida = opcoes[painel]
    possíveisChampions = roles[roleEscolhida]



while True:
    try:
        qtdChampions = int(input(f"Insira quantos champions da role {roleEscolhida} deseja\n -> "))
        if qtdChampions < 1:
            print("Insira uma quantia positiva e diferente de 0! Tente novamente! \n\n")
            continue

        champions = random.sample(roles[roleEscolhida], qtdChampions)



        break


    except Exception as erro:
        print("Insira apenas números!")
        print(erro)
        continue


print(", ".join(champions))
