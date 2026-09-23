# puxa o baanco pro python
import sqlite3
# coloquei import os porque tenho agonia do terminal sujo a cada execução
import os

# vi essa biblioteca num vídeo e achei legal de colocar pras opções
from InquirerPy import prompt


# cria conexão com banco e estabelece o cursor, que é por onde são executadas as querrys
import sqlite3
import os

# tive que colocar isso porque o arquivo .db estava indo pra raiz do repositório
pasta = os.path.dirname(__file__)
conexao = sqlite3.connect(os.path.join(pasta, "biblioteca.db"))

cursor = conexao.cursor()


# tabela livros possui id, título, genero, ano e autor
cursor.execute("create table if not exists livros(id_livro integer primary key, titulo varchar(100), genero varchar(100), ano varchar(4), autor varchar(100) unique)")
# tabela autor possui id e nome
cursor.execute("create table if not exists autores(id_autor integer primery key, nome_autor varchar(100) unique)")

# funcões pra aliviar minha cabeça mais pra frente do código

# insere o livro com o código em sql que eu quero. nada demais, é bem banal na real
def inserir_livro(titulo, genero, ano, autor):
    cursor.execute("insert into livros (titulo, genero, ano, autor) values (?, ?, ?, ?)", (titulo, genero, ano, autor))
    conexao.commit()

# é um simples select, só que um detalhe importante que me fez quebrar a cabeça no início foi que a lista tem os índices dela. tipo, numa lista (peixe, gato, cavalo, tigre), o peixe seria o lista[0], e o tigre seria o lista[3]. se as informações do livro são guardadas em lista, é só usar a mesma lógica
def exibir_livros():
    for livro in cursor.execute("select * from livros"):
        print(f'ID: {livro[0]}\nTítulo: {livro[1]}\nGênero: {livro[2]}\nAno: {livro[3]}\nAutor: {livro[4]}\n')

# aqui foi simples também. o índice só está ali pra não exibir aquela coisa feia de ('nome'). com o índice, só pega a informação da lista que eu quero. ela sai limpa
def exibir_determinado_livro():
    lista_titulos = []
    for livro in cursor.execute("select titulo from livros order by titulo"):
        lista_titulos.append(livro[0])
    # usei return aqui porque queria a informação pro código mais abaixo
    return lista_titulos



# o OS que importei só pra limpar o código no começo de tudo
os.system("cls")


lista_titulos = exibir_determinado_livro()






# aqui começam as interfaces de seleção. preferi usar esse mecanismo (vi a biblioteca no tiktok e achei interessante pra usar) porque por mais que seja trabalhosa, creio que usar switch-case ou input pras opções me daria uma dor de cabeça maior, que seria colocar try e catch junto de um while true pra contenção de erros. isso deu uma canseira pra colocar, mas tem bastante videos no youtube e a documentação ajuda bastante


opcoes_iniciais = [
    {
        "type" : "list",
        "name" : "opcoes_iniciais",
        "message" : "O que deseja fazer?",
        "choices" : ["Adicionar", "Consultar", "Atualizar", "Deletar"]
    }
]


opcoes_consultar = [
    {
        "type" : "list",
        "name" : "opcoes_consultar",
        "message" : "O que deseja exibir?",
        "choices" : ["Registro específico", "Todos os registros"]
    }
]

todos_livros = [
    {
        "type" : "list",
        "name" : "Todos os livros",
        "message" : "Selecione o livro desejado",
        "choices" : lista_titulos
    }
]

opcoes_atualizar = [
    {
        "type" : "list",
        "name" : "opcoes_atualizar",
        "message" : "O que deseja atualizar?",
        "choices" : ["Título", "Gênero", "Ano", "Autor"]
    }
]

# pra uma primeira versão do código, não foquei em otimizar nada. talvez depois eu volte nele e faça as devidas otimizações porque deve ter muito código inútil. fiz uma lista pra cada painel que eu queria porque quis implementar logo esse sistema. creio que se eu tivesse lido um pouco mais da documentação, tudo sairia beeeem mais limpo, mas como citei, o intuito agora é ser funcional, não necessariamente limpo pois é a primeira vez que uso



# aqui eu chamo o primeiro painel, que são as opções iniciais
resposta_inicial = prompt(opcoes_iniciais)

# caso o usuário queira adicionar um título
if resposta_inicial['opcoes_iniciais'] == 'Adicionar':
    titulo = input("Título: ")
    genero = input("Gênero: ")
    ano = input("Ano: ")
    autor = input("Autor: ")
    inserir_livro(titulo, genero, ano, autor)


# caso o usuário queira consultar os registros, seja um único ou todos de uma vez
if resposta_inicial['opcoes_iniciais'] == "Consultar":
    painel_consultar = prompt(opcoes_consultar)

    if painel_consultar["opcoes_consultar"] == "Todos os registros":
        exibir_livros()

    if painel_consultar['opcoes_consultar'] == "Registro específico":
        registros_especificos = prompt(todos_livros)
        titulo_escolhido = registros_especificos["Todos os livros"]

        # genuinamente não entendi o motivo da vírgula em (titulo_escolhido), mas dá erro de parâmetro se eu remover
        cursor.execute("select * from livros where titulo = ?", (titulo_escolhido,))
        busca = cursor.fetchone()
        print(f'ID: {busca[0]}\nTítulo: {busca[1]}\nGênero: {busca[2]}\nAno: {busca[3]}\nAutor: {busca[4]}')


# caso o usuário queira atualizar um registro
if resposta_inicial['opcoes_iniciais'] == "Atualizar":
    # repeti a busca feita na opção de buscar registro específico porque quero exibir as informações do titulo em específico. eu poderia simplesmente fazer com que o programa exibisse tudo de novo, mas acho que seria muita informação desnecessária


    registros_especificos = prompt(todos_livros)
    titulo_escolhido = registros_especificos["Todos os livros"]
    cursor.execute("select * from livros where titulo = ?", (titulo_escolhido,))
    busca = cursor.fetchone()
    print(f'ID: {busca[0]}\nTítulo: {busca[1]}\nGênero: {busca[2]}\nAno: {busca[3]}\nAutor: {busca[4]}')
    
    # exibe o prompt de novo, mas dessa vez, aqui o usuário seleciona o que ele quer atualizar
    resposta_atualizar = prompt(opcoes_atualizar)

    #  se o usuário selecionar a aba de título, ele pede o texto pra alterar o título
    if resposta_atualizar['opcoes_atualizar'] == "Título":
        atualizar_nome = input("Insira o novo título: ")
        cursor.execute("update livros set titulo = ? where id_livro = ?", (atualizar_nome, busca[0]))
        conexao.commit()
        print("Deu certo!")

    # mesma cois do título, só que com gênero e os "if" abaixo vão na mesma proposta
    if resposta_atualizar['opcoes_atualizar'] == "Gênero":
        atualizar_genero = input("Insira o novo gênero: ")
        cursor.execute("update livros set genero = ? where id_livro = ?", (atualizar_genero, busca[0]))
        conexao.commit()
        print("Deu certo!")

    # atualizar ano
    if resposta_atualizar['opcoes_atualizar'] == "Ano":
        atualizar_ano = input("Insira o novo ano: ")
        cursor.execute("update livro set ano = ? where id_livro = ?", (atualizar_ano, busca[0]))
        conexao.commit()
        print("Deu certo!")

    # atualizar autor
    if resposta_atualizar['opcoes_atualizar'] == "Autor":
        atualizar_autor = input("Insira o novo autor: ")
        cursor.execute("update livro set ano = ? where id_livro = ?", (atualizar_autor, busca[0]))
        conexao.commit()
        print("Deu certo!")

if resposta_inicial['opcoes_iniciais'] == "Deletar":

    registros_especificos = prompt(todos_livros)
    titulo_escolhido = registros_especificos["Todos os livros"]

    # li um pouco mais e descobri que a vírgula depois do título é porque se não colocar, ele separa cada letrinha como se fosse string. tipo "G", "A", "T", "O"... sempre que houver uma tupla de só um elemento eu tenho que colocar essa vírgula
    cursor.execute("delete from livros where titulo = ?", (titulo_escolhido,))
    conexao.commit()




# essa área vai ser destinada pra tabela de autores. depois que acabar nela, quero fazer algo com join e outros elementos do sql


    













