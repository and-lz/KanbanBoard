import Column from "./components/Column/Column";
import { List } from "./services/types";

function App() {
  return (
    <div className="p-5">
      <img
        src="https://ada-site-frontend.s3.sa-east-1.amazonaws.com/home/header-logo.svg"
        alt="Logo Ada"
        className="mb-10 block"
      />
      <div className="flex gap-5 scroll-smooth" role="list">
        <Column title="A fazer" id={List.ToDo} />
        <Column title="Fazendo" id={List.Doing} />
        <Column title="Feito" id={List.Done} />
      </div>
    </div>
  );
}

export default App;
