db = db.getSiblingDB("test");

function animal(nome) {
  return db.animals.findOne({ name: nome })._id.str;
}

db.sponsors.insertMany([
  {
    name: "Jardim Zoológico de Lisboa",
    type: "Empresa",
    logo: "http://localhost:8080/assets/images/logo_email.png",
    email: "patrocinios@zoo-exemplo.pt",
    animals: [animal("cão"), animal("gato"), animal("cavalo")],
    active: true
  },
  {
    name: "Maria Santos",
    type: "Particular",
    logo: "",
    email: "maria.santos@exemplo.pt",
    animals: [animal("gato")],
    active: true
  },
  {
    name: "Natura Seguros, S.A.",
    type: "Empresa",
    logo: "",
    email: "contacto@natura-exemplo.pt",
    animals: [animal("pardal"), animal("cavalo")],
    active: true
  }
]);
