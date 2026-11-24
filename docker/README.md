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

- `docker/mongo-init/01-animais.js`: os 4 animais de `frontend/db/db.json`. As fotografias do cão e do gato originais já não existem e foram trocadas por imagens do Wikimedia Commons;
- `docker/mongo-init/02-quizzes.js`: 6 questões, 2 quizzes e os 5 níveis de utilizador, no lugar das coleções `questions`, `quizzes` e `user_levels` que o enunciado manda copiar da base de dados do livro (no MongoDB Atlas);
- `docker/mongo-init/03-patrocinadores.js`: 3 patrocinadores, ligados aos animais pelo nome;
- `docker/mongo-init/04-especialistas.js`: 4 especialistas de instituições de Lisboa, com a área igual a um grupo dos animais.

**Comandos úteis**

- Parar: `docker compose down`
- Recomeçar com a base de dados vazia: `docker compose down -v` (apaga também os `node_modules` dos contentores)
- Ver os registos do back-end: `docker compose logs -f backend`
- Os dois servidores estão em modo de desenvolvimento: o front-end recarrega no browser e a API reinicia sozinha (com o nodemon) quando o código muda.

**Alterações ao código original** (para ler a configuração de variáveis de ambiente):

- `backend/config/config.js`: `uri` lê `MONGODB_URI`, e o email lê `EMAIL_SERVICE`, `EMAIL_USER` e `EMAIL_PASS`, sem os valores antigos do livro; a API termina com uma mensagem de erro se faltar a `MONGODB_URI`
- `frontend/src/api/config.js`: `API_URL` lê `VUE_APP_API_URL`, com o URL antigo como alternativa
