
Atividades para trabalhar com o Oscar

1  - Quantas vezes Natalie Portman foi indicada ao Oscar?
  • Foi indicada 3 vezes.

   db.registros.countDocuments({"nome_do_indicado": "Natalie Portman"})

2  - Quantos Oscars Natalie Portman ganhou?
  • Ganhou 1 oscar pela atuação em "Cisne Negro".

   db.registros.countDocuments({nome_do_indicado: "Natalie Portman", vencedor: "true"})

3  - Amy Adams já ganhou algum Oscar?
  • Amy nunca ganhou um oscar.

   db.registros.countDocuments({nome_do_indicado: "Amy Adams", vencedor: "true"})

4  - A série de filmes Toy Story ganhou um Oscar em quais anos?
  • 2 oscar em 2011 (por melhor animação e melhor canção original) e em 2020 (por melhor animação).

  db.registros.find({ nome_do_indicado: { in$: ["Toy Story" , "Toy Story 2" , "Toy Story 3" , "Toy Story 4"] }})

5  - A partir de que ano que a categoria "Actress" deixa de existir? 
  • Deixou de existir na cerimonia de 1976.

  db.registros.find({categoria:"ACTRESS"}).sort({ano_cerimonia:-1}).limit(1)

6  - O primeiro Oscar para melhor Atriz foi para quem? Em que ano?
  • A ganhadora foi Janet Gaynor, pelo filme "7th Heaven". Na cerimonia de 1928.

  db.registros.find({vencedor:"true", categoria: "ACTRESS"}, {nome_do_indicado: 1, ano_cerimonia: 1, _id: 0}).limit(1)

7  - Na campo "Vencedor", altere todos os valores com "Sim" para 1 e todos os valores "Não" para 0.
  •

  db.registros.updateMany(
  { "vencedor": "false" }, 
  { 
    $set: { "vencedor": 0 }
  }
);
db.registros.updateMany(
  { "vencedor": "true" }, 
  { 
    $set: { "vencedor": 1 }
  }
);

8  - Em qual edição do Oscar "Crash" concorreu ao Oscar?
  • Ano de 2006, na cerimonia de número 78

  db.registros.find({nome_do_filme: "Crash"},{cerimonia:1, ano_cerimonia:1}).limit(1)

9  - Bom... dê um Oscar para um filme que merece muito, mas não ganhou.
  • O filme injustiçado... Bastardos Inglórios, de Quentin Tarantino.

  db.registros.updateOne(
  { 
categoria: "DIRECTING",
nome_do_filme: "Inglourious Basterds" }, 
  { 
    $set: { "vencedor": "1" }
  }
);

10 - O filme Central do Brasil aparece no Oscar?
  • Sim

db.registros.find({ nome_do_filme: "Central Station" })
  
11 - Inclua no banco 3 filmes que nunca foram nem nomeados ao Oscar, mas que merecem ser. 
  • Os filmes:
    - Fuga das Galinhas, de Peter Lord e Nick Park;
    - Scott Pilgrim Contra o Mundo, de Edgar Wright
    - Cães de Aluguel, de Quentin Tarantino.

    db.registros.insertMany([
    {
      id_registro: 10890,
          ano_filmagem: 2000,
          ano_cerimonia: 2001,
          cerimonia: 73,
          categoria: "HONORARY AWARD",
          nome_do_indicado: "Nick Park, Peter Lord and David Sproxton, Producers",
          nome_do_filme: "Chicken Run",
          vencedor: 1
    },
  {
    id_registro: 10891,
        ano_filmagem: 2010,
        ano_cerimonia: 2011,
        cerimonia: 83,
        categoria: "Honorary Award", 
        nome_do_indicado: "Edgar Wright, Nira Park, Marc Platt and Eric Gitter, Producers",
        nome_do_filme: "Scott Pilgrim vs. the World",
        vencedor: 1
  },
   {
    id_registro: 10892,
        ano_filmagem: 1992,
        ano_cerimonia: 1993,
        cerimonia: 65,
        categoria: "Honorary Award",
        nome_do_indicado: "Lawrence Bender, Productions",
        nome_do_filme: "Reservoir Dogs",
        vencedor: 1
  }
])

12 - Pensando no ano em que você nasceu: Qual foi o Oscar de melhor filme, Melhor Atriz e Melhor Diretor?
  • No ano de 2003 tivemos:
    - Melhor filme: Chicago, de Rob Marshall;
    - Melhor atriz: Nicole Kidman, por "The Hours";
    - Melhor diretor: Roman Polanski, por "The Pianist".

    > db.registros.find({ano_cerimonia: 2003, vencedor: 1, categoria: { "$in": [/LEADING ROLE/, /PICTURE/]}}, {categoria: 1, nome_do_indicado: 1, nome_do_filme: 1, _id: 0})
< {
  categoria: 'BEST PICTURE',
  nome_do_indicado: 'Martin Richards, Producer',
  nome_do_filme: 'Chicago'
  }
  {
  categoria: 'ACTRESS IN A LEADING ROLE',
  nome_do_indicado: 'Nicole Kidman',
  nome_do_filme: 'The Hours'
  }
  {
  categoria: 'ACTOR IN A LEADING ROLE',
  nome_do_indicado: 'Adrien Brody',
  nome_do_filme: 'The Pianist'
  }
