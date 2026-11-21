# MiniProj2: Animalec com patrocinadores e especialistas

Miniprojeto da Tarefa 3.2 de Programação Web Avançada (MEIW, Universidade Aberta). Parte do Projeto Animalec, do livro recomendado da unidade curricular, e acrescenta duas entidades ao *back-office*: patrocinadores e especialistas.

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `backend/` | API REST em Node.js (Express, Mongoose, JWT) |
| `frontend/` | Aplicação Vue 2 (Vue Router, Vuex, Bootstrap-Vue) |
| `docker/` | Dados iniciais do MongoDB, criação de utilizadores |
| `docker-compose.yml` | MongoDB, *back-end* e *front-end* em contentores |

## Arranque

É preciso ter o Docker com o Docker Compose.

```bash
chmod -R a+rX docker
docker compose up
```

Na primeira vez demora alguns minutos, porque o `npm ci` corre dentro de cada contentor.

| Serviço | Endereço |
|---|---|
| *Front-end* | http://localhost:8081 |
| API | http://localhost:8080 |
| MongoDB 4.4 | mongodb://localhost:27017/test |

**Credenciais:** `admin` / `admin` (administrador, com acesso ao *back-office*) e `aluno` / `aluno123` (utilizador normal).

**Dados iniciais:** 4 animais, 6 questões, 2 quizzes e 5 níveis de utilizador (`docker/mongo-init/`). Só são inseridos quando a base de dados é criada; para os repor, usar `docker compose down -v` e voltar a arrancar.

Mais pormenores (comandos úteis e alterações ao código original): [docker/README.md](docker/README.md).

## Nota sobre credenciais no código original

O ficheiro `backend/config/config.js` vem do repositório do livro e contém a palavra-passe da base de dados Atlas e de uma conta de correio usadas pelos autores. Já eram públicas no código original e não são usadas neste ambiente (a ligação ao MongoDB vem da variável `MONGODB_URI`).
