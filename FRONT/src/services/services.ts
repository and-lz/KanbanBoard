import { Task } from "../App";

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

export async function createTask(column: "ToDo" | "Doing" | "Done" = "ToDo") {
  await getToken();

  const headersLocal = {
    ...headers,
    Authorization: "Bearer " + token,
  };

  const response = await fetch(`${URL}/cards`, {
    method: "POST",
    headers: headersLocal,
    body: JSON.stringify({
      titulo: "Nova tarefa " + Date.now(),
      conteudo: "Descrição",
      lista: column,
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

export async function updateTask(uuid: string, body: Task) {
  await getToken();

  const headersLocal = {
    ...headers,
    Authorization: "Bearer " + token,
  };

  return fetch(`${URL}/cards/${uuid}`, {
    method: "PUT",
    headers: headersLocal,
    body: JSON.stringify(body),
  });
}

export async function deleteTask(uuid: string) {
  await getToken();

  const headersLocal = {
    ...headers,
    Authorization: "Bearer " + token,
  };

  return fetch(`${URL}/cards/${uuid}`, {
    method: "DELETE",
    headers: headersLocal,
  });
}
