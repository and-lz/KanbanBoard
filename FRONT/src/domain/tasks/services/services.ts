import { List, Task } from "./types";

let token: string = "";
const URL: string = "http://localhost:4000";

const headers: Record<string, string> = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

async function getToken(): Promise<void> {
  if (!token) {
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
}

async function sendAuthorizedRequest<T>(
  path: string,
  method: string,
  data?: Record<string, any>
): Promise<T> {
  await getToken();

  const headersLocal: Record<string, string> = {
    ...headers,
    Authorization: "Bearer " + token,
  };

  const requestOptions: RequestInit = {
    method,
    headers: headersLocal,
  };

  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  const response = await fetch(`${URL}/${path}`, requestOptions);

  if (!response.ok) {
    throw new Error(
      `Failed request: ${response.status} - ${response.statusText}`
    );
  }

  return response.json();
}

export async function createTask(column: List = List.ToDo): Promise<any> {
  return sendAuthorizedRequest("cards", "POST", {
    titulo: "Nova tarefa " + Date.now(),
    conteudo: "Descrição",
    lista: column,
  });
}

export async function getTasks(): Promise<any> {
  return sendAuthorizedRequest("cards", "GET");
}

export async function updateTask(uuid: string, body: Task): Promise<void> {
  await sendAuthorizedRequest(`cards/${uuid}`, "PUT", body);
}

export async function deleteTask(uuid: string): Promise<void> {
  await sendAuthorizedRequest(`cards/${uuid}`, "DELETE");
}
