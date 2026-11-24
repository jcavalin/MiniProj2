db = db.getSiblingDB("test");

const q = {
  caoGrupo: ObjectId("650000000000000000000101"),
  gatoBigodes: ObjectId("650000000000000000000102"),
  caoMamifero: ObjectId("650000000000000000000103"),
  pardalGrupo: ObjectId("650000000000000000000201"),
  cavaloPatas: ObjectId("650000000000000000000202"),
  pardalVoo: ObjectId("650000000000000000000203")
};

function questao(id, nivel, grupo, pergunta, descricao, respostas) {
  return {
    _id: id,
    question: pergunta,
    title: pergunta,
    description: descricao,
    type: "Escolha múltipla",
    group: grupo,
    level: nivel,
    answers: respostas.map(([titulo, certa]) => ({
      _id: new ObjectId(),
      title: titulo,
      description: titulo,
      correct: certa
    })),
    date: new Date(),
    active: true
  };
}

db.questions.insertMany([
  questao(q.caoGrupo, 1, "mamífero", "A que grupo pertence o cão?",
    "O cão é o melhor amigo do homem.",
    [["Mamífero", true], ["Ave", false], ["Réptil", false]]),
  questao(q.gatoBigodes, 1, "mamífero", "Para que servem os bigodes do gato?",
    "Os bigodes (vibrissas) são pelos muito sensíveis.",
    [["Para sentir o espaço à sua volta", true], ["Para se alimentar", false], ["Para nadar", false]]),
  questao(q.caoMamifero, 1, "mamífero", "Como se alimentam as crias do cão nas primeiras semanas?",
    "Os mamíferos alimentam as crias com leite.",
    [["Com leite materno", true], ["Com sementes", false], ["Com insetos", false]]),
  questao(q.pardalGrupo, 2, "ave", "A que grupo pertence o pardal?",
    "O pardal é uma das aves mais comuns nas cidades.",
    [["Ave", true], ["Mamífero", false], ["Peixe", false]]),
  questao(q.cavaloPatas, 2, "mamífero", "Quantas patas tem um cavalo?",
    "O cavalo é um mamífero quadrúpede.",
    [["Quatro", true], ["Duas", false], ["Seis", false]]),
  questao(q.pardalVoo, 2, "ave", "O que cobre o corpo do pardal?",
    "Todas as aves têm o corpo coberto do mesmo tipo de estrutura.",
    [["Penas", true], ["Escamas", false], ["Pelo", false]])
]);

db.quizzes.insertMany([
  {
    name: "Cão e gato",
    points: 50,
    level: 1,
    date: new Date(),
    questions: [q.caoGrupo, q.gatoBigodes, q.caoMamifero].map(id => id.str),
    active: true
  },
  {
    name: "Pardal e cavalo",
    points: 100,
    level: 2,
    date: new Date(),
    questions: [q.pardalGrupo, q.cavaloPatas, q.pardalVoo].map(id => id.str),
    active: true
  }
]);

db.user_levels.insertMany([
  { level: 1, name: "iniciante", avatar: "sapo", max: 100 },
  { level: 2, name: "aprendiz", avatar: "macaco", max: 200 },
  { level: 3, name: "junior", avatar: "cao", max: 300 },
  { level: 4, name: "especialista", avatar: "tigre", max: 400 },
  { level: 5, name: "mestre", avatar: "leao", max: 9007199254740991 }
]);
