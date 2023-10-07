import { DragEvent } from "react";
import { useAppContext } from "./AppContext";
import Card from "./components/Card/Card";
import { todos } from "./data";
import { useViewTransition } from "./hooks/useViewTransition";
import { flushSync } from "react-dom";
import Column from "./components/Column/Column";

export enum List {
  ToDo = "ToDo",
  Doing = "Doing",
  Done = "Done",
}

export interface Task {
  id: string;
  title: string;
  list: string;
  description: string;
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
        <Column list="ToDo" />
        <Column list="Doing" />
        <Column list="Done" />
      </div>
    </div>
  );
}

export default App;
