let token = "";

let URL = "http://localhost:4000";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function getToken() {
  if (token !== "") return;
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      login: "letscode",
      senha: "lets@123",
    }),
  });
  token = await response.json();
}

export async function createTask() {
  await getToken();

  const headersLocal = {
    ...headers,
    Authorization: "Bearer " + token,
  };

  const response = await fetch(`${URL}/cards`, {
    method: "POST",
    headers: headersLocal,
    body: JSON.stringify({
      titulo: "Task " + Date.now(),
      conteudo: "novo card " + Date.now(),
      lista: "ToDo",
    }),
  });

  const data = await response.json();
}

export async function getTasks() {
  await getToken();

  const headersLocal = {
    ...headers,
    Authorization: "Bearer " + token,
  };

  const response = await fetch(`${URL}/cards`, {
    headers: headersLocal,
  });

  return await response.json();
}
