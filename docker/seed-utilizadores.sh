#!/bin/sh
# Cria os utilizadores de teste através da API (POST /users é público).
# A API trata do hash da palavra-passe e das chaves do JWT.
set -e
API="${API_URL:-http://backend:8080}"

echo "A aguardar a API em $API..."
until curl -s -o /dev/null "$API/"; do sleep 2; done

criar() {
  # $1 = utilizador, $2 = palavra-passe, $3 = tipo (admin ou user), $4 = nome
  curl -s -o /dev/null -w "  $1 ($3): HTTP %{http_code}\n" -X POST "$API/users" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$4\",\"type\":\"$3\",\"birth_date\":\"1990-01-01\",\"description\":\"Utilizador de teste\",\"location\":{\"city\":\"Lisboa\",\"district\":\"Lisboa\",\"country\":\"Portugal\"},\"auth\":{\"username\":\"$1\",\"password\":\"$2\"}}"
}

echo "A criar utilizadores (HTTP 409 ou semelhante = já existia):"
criar admin admin admin "Administrador"
criar aluno aluno123 user "Aluno"
