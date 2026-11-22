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
  }
};

function handleResponses(code) {
  let message = "";
  switch (code) {
    case 401:
      message = "Não está autorizado a executar esta ação!";
      break;
    default:
      message = "Mensagem desconhecida";
      break;
  }
  return message;
}

export default expertService;
