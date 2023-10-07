import Column from "./components/Column/Column";

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

function App() {
  return (
    <div className="p-5">
      <img
        src="https://ada-site-frontend.s3.sa-east-1.amazonaws.com/home/header-logo.svg"
        alt="Logo Ada"
        className="mb-10 block"
      />
      <div className="flex gap-5" role="list">
        <Column title="A fazer" id="ToDo" />
        <Column title="Fazendo" id="Doing" />
        <Column title="Feito" id="Done" />
      </div>
    </div>
  );
}

export default App;
