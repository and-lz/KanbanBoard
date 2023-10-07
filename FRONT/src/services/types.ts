export enum List {
  ToDo = "ToDo",
  Doing = "Doing",
  Done = "Done",
}

export interface Task {
  id: string;
  titulo: string;
  lista: string;
  conteudo: string;
}
