# Correr o Animalec com Docker

```bash
chmod -R a+rX docker   # os contentores do curl e do MongoDB não correm como root
docker compose up
```

Na primeira vez demora alguns minutos (o `npm ci` corre dentro de cada contentor).

| Serviço | Endereço |
|---|---|
| Front-end (Vue 2) | http://localhost:8081 |
| Back-end (API Express) | http://localhost:8080 |
| MongoDB 4.4 | mongodb://localhost:27017/test |

**Utilizadores de teste** (criados pelo serviço `seed`):

- `admin` / `admin`: tipo `admin`, vê a entrada ADMIN no menu (back-office)
- `aluno` / `aluno123`: tipo `user`

**Dados iniciais** (inseridos só quando a base de dados é criada):

- `docker/mongo-init/01-animais.js`: os 4 animais de `frontend/db/db.json`;
- `docker/mongo-init/02-quizzes.js`: 6 questões, 2 quizzes (níveis 1 e 2) e os 5 níveis de utilizador de `frontend/src/store/module.js`. Substituem as coleções `questions`, `quizzes` e `user_levels` da base Atlas do livro;
- `docker/mongo-init/03-patrocinadores.js`: 3 patrocinadores, ligados aos animais pelo nome;
- `docker/mongo-init/04-especialistas.js`: 4 especialistas de instituições de Lisboa, com a área igual a um grupo dos animais.

**Comandos úteis**

- Parar: `docker compose down`
- Recomeçar com a base de dados vazia: `docker compose down -v` (apaga também os `node_modules` dos contentores)
- Ver os registos do back-end: `docker compose logs -f backend`

**Alterações ao código original** (para ler a configuração de variáveis de ambiente, mantendo os valores antigos como alternativa):

- `backend/config/config.js`: `uri` lê `MONGODB_URI`
- `frontend/src/api/config.js`: `API_URL` lê `VUE_APP_API_URL`

Usa Node 16 porque o vue-cli 4 (webpack 4) e algumas dependências não aceitam Node 17 ou mais recente.
