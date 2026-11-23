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

  async getExpert(token, id) {
    const response = await fetch(`${API_URL}/experts/${id}`, {
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

  async editExpert(token, payload) {
    const response = await fetch(`${API_URL}/experts/${payload._id}`, {
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

  async removeExpert(token, id) {
    const response = await fetch(`${API_URL}/experts/${id}`, {
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
    case 404:
      message = "O especialista não existe (pode ter sido removido).";
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
