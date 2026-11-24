db = db.getSiblingDB("test");

db.experts.insertMany([
  {
    name: "Ana Ribeiro",
    institution: "Faculdade de Medicina Veterinária da Universidade de Lisboa",
    area: "mamífero",
    email: "ana.ribeiro@exemplo.pt",
    active: true
  },
  {
    name: "Rui Costa",
    institution: "Faculdade de Ciências da Universidade de Lisboa",
    area: "ave",
    email: "rui.costa@exemplo.pt",
    active: true
  },
  {
    name: "Inês Lopes",
    institution: "Universidade NOVA de Lisboa",
    area: "mamífero",
    email: "ines.lopes@exemplo.pt",
    active: true
  },
  {
    name: "Tiago Matos",
    institution: "Universidade Católica Portuguesa (Lisboa)",
    area: "ave",
    email: "tiago.matos@exemplo.pt",
    active: true
  }
]);
