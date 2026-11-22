import API_URL from "./config.js";

// Comunicação com os endpoints /experts da API (Fetch API), no padrão de animal.service.js.
export const expertService = {
  async getExperts(token) {
    let response = await fetch(`${API_URL}/experts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

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
};

function handleResponses(code) {
  let message = "";
  switch (code) {
    case 401:
      message = "Não está autorizado a executar esta ação!";
      break;
    case 406:
      message =
        "Dados inválidos: confirme o nome, a instituição, a área e o email.";
      break;
    default:
      message = "Mensagem desconhecida";
      break;
  }
  return message;
}

export default expertService;
