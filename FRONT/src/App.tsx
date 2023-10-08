import Column from "./domain/tasks/components/Column/Column";
import Toast from "./domain/tasks/components/Toast/Toast";
import { List } from "./domain/tasks/services/types";

function App() {
  return (
    <>
      <div className="p-5">
        <img
          src="https://ada-site-frontend.s3.sa-east-1.amazonaws.com/home/header-logo.svg"
          alt="Logo Ada"
          className="mb-20 block"
        />
        <div className="flex gap-5 scroll-smooth" role="list">
          <Column title="A fazer" id={List.ToDo} showAddTaskButton />
          <Column title="Fazendo" id={List.Doing} />
          <Column title="Feito" id={List.Done} />
        </div>
      </div>
      <Toast />
    </>
  );
}

export default App;
