# MiniProj2: Animalec com patrocinadores e especialistas

Miniprojeto da Tarefa 3.2 de Programação Web Avançada (MEIW, Universidade Aberta). Parte do Projeto Animalec, do livro recomendado da unidade curricular, e acrescenta duas entidades ao *back-office*: patrocinadores e especialistas, planeadas na Tarefa 3.1. Cada entidade tem *endpoints* próprios no *back-end* e as respetivas páginas no *front-end*.

## Funcionalidades

**No *back-office*** (menu ADMIN, só para administradores), o menu "Gestão do Animalec" tem dois cartões novos: PATROCINADORES e ESPECIALISTAS.

**Patrocinadores**

- Listagem com pesquisa por nome (sem distinguir maiúsculas nem acentos) e ordenação por nome, crescente ou decrescente;
- Adicionar e editar: nome, tipo (empresa ou particular), *link* para o logótipo (opcional), email de contacto e animais patrocinados. Os animais escolhem-se num campo com pesquisa e etiquetas, e só se podem escolher animais ativos;
- Ver: janela com o logótipo (ou uma caixa com o nome, se não houver logótipo), o tipo, o email e os animais patrocinados;
- Remover, com pedido de confirmação.

**Especialistas**

- Listagem com pesquisa e ordenação por nome, como nos patrocinadores;
- Adicionar e editar: nome, instituição, área e email de contacto. A área escolhe-se numa lista feita a partir dos grupos dos animais (por exemplo, mamífero e ave);
- Ver: janela com o nome, a área, a instituição e o email;
- Remover, com pedido de confirmação.

**Em ambas as entidades**

- Os dados são validados no *front-end* (campos obrigatórios, email, URL) e de novo na API, que recusa dados inválidos com `406`;
- Todas as rotas da API exigem sessão iniciada (*token* JWT);
- Os textos vindos da base de dados são mostrados nas janelas como texto, nunca como HTML;
- *Design* responsivo: abaixo de 768 px, as tabelas passam a cartões (um por registo), os botões dos formulários ocupam a largura toda e os títulos ficam mais pequenos. Os estilos partilhados estão em `frontend/src/assets/css/backoffice.css`.

## Fases do enunciado

| Fase | Onde está |
|---|---|
| 1. Replicar o Animalec e pô-lo totalmente funcional | `docker compose up` (ver [Arranque](#arranque)); os quizzes, as questões e os níveis de utilizador vêm de `docker/mongo-init/02-quizzes.js` |
| 2. Implementar as entidades planeadas na 3.1 | [Funcionalidades](#funcionalidades) |
| 3. Explorar a API e a comunicação com o servidor | [API: patrocinadores e especialistas](#api-patrocinadores-e-especialistas) |
| 4. Todos os ficheiros no Git, no projeto MiniProj2 | Este repositório (código original e código novo) |

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

**Dados iniciais:** 4 animais, 6 questões, 2 quizzes, 5 níveis de utilizador, 3 patrocinadores e 4 especialistas (`docker/mongo-init/`). Só são inseridos quando a base de dados é criada; para os repor, usar `docker compose down -v` e voltar a arrancar.

Mais pormenores (comandos úteis e alterações ao código original): [docker/README.md](docker/README.md).

## API: patrocinadores e especialistas

As duas entidades novas têm *endpoints* próprios no *back-end*, com a mesma organização dos animais do projeto original: rota (`backend/routes/`), controlador (`backend/controllers/`), modelo Mongoose (`backend/models/`) e mensagens de resposta (`backend/messages/`).

### Autenticação

Todos os *endpoints* novos exigem sessão iniciada. O *token* JWT obtém-se com `POST /auth` e vem no cabeçalho `Authorization` da resposta; os pedidos seguintes enviam-no no cabeçalho com o mesmo nome. Sem *token*, ou com um *token* expirado ou de assinatura inválida, a resposta é `401` (`InvalidToken`). Além disso, só os utilizadores do tipo `admin` os podem usar: com outro tipo de utilizador (por exemplo, `aluno`), a resposta é `403` (`AdminOnly`).

```bash
TOKEN=$(curl -s -D - -o /dev/null -X POST http://localhost:8080/auth \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"admin"}' \
  | tr -d '\r' | sed -n 's/^Authorization: //p')

curl -H "Authorization: $TOKEN" http://localhost:8080/sponsors
```

### Formato das respostas

As respostas seguem o formato do projeto original: `{ "http": 200, "code": "SponsorFound", "type": "success", "body": ... }`. Quando os dados não passam na validação (`express-validator`), a resposta é `406` com a lista dos campos inválidos, por exemplo `[{ "param": "email", "msg": "Invalid value", ... }]`.

### Patrocinadores (`/sponsors`)

| Método | Rota | O que faz | Respostas |
|---|---|---|---|
| `GET` | `/sponsors` | Lista os patrocinadores, com o nome e o estado de cada animal | `200` `SponsorFound` |
| `POST` | `/sponsors` | Cria um patrocinador (cabeçalho `location` com a rota do novo registo) | `201` `SponsorCreated`, `406` |
| `GET` | `/sponsors/:id` | Devolve um patrocinador | `200` `SponsorFound`, `404` `SponsorNotFound`, `406` |
| `PUT` | `/sponsors/:id` | Altera um patrocinador | `200` `SponsorUpdated`, `404` `SponsorNotFound`, `406` |
| `DELETE` | `/sponsors/:id` | Remove um patrocinador | `200` `SponsorDeleted`, `404` `SponsorNotFound`, `406` |

Corpo JSON de `POST` e `PUT`:

```json
{
  "name": "Jardim Zoológico de Lisboa",
  "type": "Empresa",
  "logo": "http://localhost:8080/assets/images/logo_email.png",
  "email": "patrocinios@zoo-exemplo.pt",
  "animals": ["<id de um animal>", "<id de outro animal>"]
}
```

Regras de validação:

- `name` obrigatório; `type` tem de ser `Empresa` ou `Particular`; `email` tem de ser um email válido;
- `logo` é opcional, mas, se vier preenchido, tem de ser um URL;
- `animals` tem pelo menos um identificador; os animais novos têm de existir e estar ativos, senão a resposta é `406` `InvalidAnimals`. Ao editar, os animais que o patrocinador já tinha mantêm-se aceites mesmo que tenham sido desativados entretanto;
- `PUT` só altera os campos acima; o estado `active` não muda;
- um `:id` que não seja um identificador MongoDB válido dá `406`.

### Especialistas (`/experts`)

| Método | Rota | O que faz | Respostas |
|---|---|---|---|
| `GET` | `/experts` | Lista os especialistas (aceita filtros na *query string*, por exemplo `?area=ave`) | `200` `ExpertFound` |
| `POST` | `/experts` | Cria um especialista (cabeçalho `location` com a rota do novo registo) | `201` `ExpertCreated`, `406` |
| `GET` | `/experts/:id` | Devolve um especialista | `200` `ExpertFound`, `404` `ExpertNotFound`, `406` |
| `PUT` | `/experts/:id` | Altera um especialista | `200` `ExpertUpdated`, `404` `ExpertNotFound`, `406` |
| `DELETE` | `/experts/:id` | Remove um especialista | `200` `ExpertDeleted`, `404` `ExpertNotFound`, `406` |

Corpo JSON de `POST` e `PUT`:

```json
{
  "name": "Ana Ribeiro",
  "institution": "Faculdade de Medicina Veterinária da Universidade de Lisboa",
  "area": "mamífero",
  "email": "ana.ribeiro@exemplo.pt"
}
```

Regras de validação:

- `name`, `institution` e `area` obrigatórios; `email` tem de ser um email válido;
- `area` tem de ser um dos grupos usados pelos animais (campo `group`, por exemplo `mamífero` ou `ave`), senão a resposta é `406` `InvalidArea`. Ao editar, a área que o especialista já tinha mantém-se aceite;
- `PUT` só altera os campos acima; o estado `active` não muda;
- um `:id` que não seja um identificador MongoDB válido dá `406`.

### Comunicação no *front-end* (Fetch API)

O *front-end* fala com a API em três camadas, como nos animais:

1. **Serviços** (`frontend/src/api/sponsor.service.js` e `expert.service.js`): uma função `async` por *endpoint*, que usa `fetch` com o URL de `api/config.js`, o cabeçalho `Content-Type: application/json` e o *token* no cabeçalho `Authorization`. Se `response.ok` for verdadeiro, devolvem o JSON; senão, lançam um erro com uma mensagem em português conforme o código HTTP (`401`, `403`, `404` ou `406`), dada pela função `handleResponses`.
2. **Store Vuex** (`frontend/src/store/sponsors/` e `frontend/src/store/experts/`): cada ação chama o serviço com o *token* guardado em `auth`, atualiza o estado ou a mensagem e devolve uma *Promise*.
3. **Vistas** (`frontend/src/views/sponsors/` e `frontend/src/views/experts/`): chamam as ações com `this.$store.dispatch` e mostram o resultado ou o erro em janelas (`vue-simple-alert`).

Exemplo, do serviço de especialistas:

```js
async addExpert(token, payload) {
  const response = await fetch(`${API_URL}/experts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(payload)
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw Error(handleResponses(response.status));
  }
}
```

## Verificação

O projeto original não tem testes automáticos, e este miniprojeto segue a mesma opção. Cada funcionalidade foi verificada à mão no *browser*, em ecrã largo (1280 px) e em *mobile* (375 px).

## Nota sobre credenciais no código original

O ficheiro `backend/config/config.js` vem do repositório do livro e contém a palavra-passe da base de dados Atlas e de uma conta de correio usadas pelos autores. Já eram públicas no código original e não são usadas neste ambiente (a ligação ao MongoDB vem da variável `MONGODB_URI`).
