from yt_dlp import YoutubeDL
from pathlib import Path
# Precisa de pip install yt_dl e pip install pathlib!


def baixarMusicas():  
    home = Path.home() 
    url = input("Insira a URL da música/playlist a ser baixada (Apenas URL do youtube!): ")
    opcoes = {
        "format" : "bestaudio",
        "merge_output_format" : "mp4",
        "outtmpl" : f"{home}\Downloads\%(title)s.%(ext)s",
        "quiet" : True,
        "no_warnings" : True
    }
    with YoutubeDL(opcoes) as ydl:
        ydl.download([url])

escolha = str(input("[1] - Baixar uma música/playlist \n[2] - Baixar várias músicas/playlists\n->"))
while escolha != "1" and escolha != "2":
    print("Caractere inválido!")
    escolha = input("[1] - Baixar uma música/playlist \n[2] - Baixar várias músicas/playlist\n->")
    
if escolha == "1":
    baixarMusicas();
elif escolha == "2":
    while True:
        try:
            quantia = int(input("Insira a quantia de músicas (ou playlists) a serem baixadas:\n->"))
            break
        except ValueError:
            print("Insira apenas números!")
    for i in range(quantia):
        baixarMusicas()
        print(f"[{i+1}º DOWNLOAD TERMINADO!]")
    

