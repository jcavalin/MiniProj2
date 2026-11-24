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
        "url": "https://commons.wikimedia.org/wiki/Special:FilePath/YellowLabradorLooking_new.jpg?width=640"
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
        "url": "https://commons.wikimedia.org/wiki/Special:FilePath/Cat_November_2010-1a.jpg?width=640"
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
