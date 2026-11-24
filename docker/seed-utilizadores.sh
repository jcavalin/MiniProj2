#!/bin/sh
set -e
API="${API_URL:-http://backend:8080}"

echo "A aguardar a API em $API..."
until curl -s -o /dev/null "$API/"; do sleep 2; done

criar() {
  curl -s -o /dev/null -w "  $1 ($3): HTTP %{http_code}\n" -X POST "$API/users" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$4\",\"type\":\"$3\",\"birth_date\":\"1990-01-01\",\"description\":\"Utilizador de teste\",\"location\":{\"city\":\"Lisboa\",\"district\":\"Lisboa\",\"country\":\"Portugal\"},\"auth\":{\"username\":\"$1\",\"password\":\"$2\"}}"
}

echo "A criar utilizadores (HTTP 409 ou semelhante = já existia):"
criar admin admin admin "Administrador"
criar aluno aluno123 user "Aluno"
