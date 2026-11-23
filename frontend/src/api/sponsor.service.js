import API_URL from "./config.js";

// Comunicação com os endpoints /sponsors da API (Fetch API), no padrão de animal.service.js.
export const sponsorService = {
  async getSponsors(token) {
    let response = await fetch(`${API_URL}/sponsors`, {
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

  async getSponsor(token, id) {
    const response = await fetch(`${API_URL}/sponsors/${id}`, {
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

  async editSponsor(token, payload) {
    const response = await fetch(`${API_URL}/sponsors/${payload._id}`, {
      method: "PUT",
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
  },

  async removeSponsor(token, id) {
    const response = await fetch(`${API_URL}/sponsors/${id}`, {
      method: "DELETE",
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

  async addSponsor(token, payload) {
    const response = await fetch(`${API_URL}/sponsors`, {
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
    case 403:
      message = "Só os administradores podem executar esta ação!";
      break;
    case 404:
      message = "O patrocinador não existe (pode ter sido removido).";
      break;
    case 406:
      message =
        "Dados inválidos: confirme o email, o tipo e os animais escolhidos.";
      break;
    default:
      message = "Mensagem desconhecida";
      break;
  }
  return message;
}

export default sponsorService;
