// Funções de texto partilhadas pelas vistas de patrocinadores e especialistas.

// Texto em minúsculas e sem acentos, para as pesquisas ignorarem maiúsculas e acentuação
export function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Escapa o texto escrito pelos utilizadores antes de o pôr em HTML (janelas do vue-simple-alert).
// O innerHTML não escapa aspas, por isso trocam-se à parte: o texto também entra em atributos (href, src).
export function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Primeira letra em maiúscula (ex.: «mamífero» passa a «Mamífero»)
export function capitalizar(texto) {
  return texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : "";
}
