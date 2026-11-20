// Dados iniciais do MongoDB (corre só quando o volume da base de dados está vazio).
// Animais tirados de frontend/db/db.json.
db = db.getSiblingDB("test");
db.animals.insertMany([
  {
    "name": "cão",
    "group": "mamífero",
    "description": "O cão é o melhor amigo do homem",
    "level": 1,
    "links": [
      {
        "types": "photo",
        "url": "https://www.purina.pt/sites/g/files/mcldtz1671/files/2018-03/cao-em-casa.jpg"
      },
      {
        "types": "video",
        "url": "https:"
      },
      {
        "types": "sound",
        "url": "https"
      }
    ],
    "evaluation": [],
    "comments": [],
    "active": true
  },
  {
    "name": "gato",
    "group": "mamífero",
    "description": "O gato é o melhor amigo do homem",
    "level": 1,
    "links": [
      {
        "types": "photo",
        "url": "https://www.royalcanin.es/wp-content/uploads/2017/10/bigotesnew.jpg"
      },
      {
        "types": "video",
        "url": "https:"
      },
      {
        "types": "sound",
        "url": "https"
      }
    ],
    "evaluation": [],
    "comments": [],
    "active": true
  },
  {
    "name": "pardal",
    "group": "ave",
    "description": "O pardal é o melhor amigo do homem",
    "level": 2,
    "links": [
      {
        "types": "photo",
        "url": "https://cdn.pixabay.com/photo/2019/07/23/00/55/sparrow-4356373_960_720.png"
      },
      {
        "types": "video",
        "url": "https:"
      },
      {
        "types": "sound",
        "url": "https"
      }
    ],
    "evaluation": [],
    "comments": [],
    "active": true
  },
  {
    "name": "cavalo",
    "group": "mamífero",
    "description": "O cavalo é o melhor amigo do homem",
    "level": 2,
    "links": [
      {
        "types": "photo",
        "url": "https://cdn.pixabay.com/photo/2017/03/29/20/02/arabian-2186313_960_720.png"
      },
      {
        "types": "video",
        "url": "https:"
      },
      {
        "types": "sound",
        "url": "https"
      }
    ],
    "evaluation": [],
    "comments": [],
    "active": true
  }
]);
