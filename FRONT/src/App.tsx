import { DragEvent } from "react";
import { useAppContext } from "./AppContext";
import Card from "./components/Card/Card";
import { todos } from "./data";

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
  const { tasks, update } = useAppContext();

  function handleChangeList(id: string, newColumn: string) {
    const newTasks = [...tasks];
    newTasks.find((todo) => todo.id === id)!.list = newColumn;
    update({ tasks: newTasks });
  }
  function onDrop(event: DragEvent, targetColumn: string) {
    const task = event.dataTransfer.getData("task");
    handleChangeList(task, targetColumn);
  }

  function onDragStart(e: DragEvent, task: Task) {
    e.dataTransfer.setData("task", task.id);
  }

  return (
    <>
      <img
        src="https://ada-site-frontend.s3.sa-east-1.amazonaws.com/home/header-logo.svg"
        alt=""
      />
      <div className="flex gap-5 p-5">
        <div
          className="flex-1"
          onDrop={(e) => onDrop(e, "ToDo")}
          onDragOver={(e) => e.preventDefault()}
        >
          <h2 className="mb-5 text-white text-xl font-extrabold">A Fazer</h2>
          {todos
            .filter((todo) => todo.list === "ToDo")
            .map((task) => (
              <Card
                onDragStart={(e: DragEvent) => onDragStart(e, task)}
                task={task}
                key={task.id}
              />
            ))}
        </div>
        <div
          className="flex-1"
          onDrop={(e) => onDrop(e, "Doing")}
          onDragOver={(e) => e.preventDefault()}
        >
          <h2 className="mb-5 text-white text-xl font-extrabold">Fazendo</h2>
          {todos
            .filter((todo) => todo.list === "Doing")
            .map((task) => (
              <Card
                onDragStart={(e: DragEvent) => onDragStart(e, task)}
                task={task}
                key={task.id}
              />
            ))}
        </div>
        <div
          className="flex-1"
          onDrop={(e) => onDrop(e, "Done")}
          onDragOver={(e) => e.preventDefault()}
        >
          <h2 className="mb-5 text-white text-xl font-extrabold">Feito</h2>
          {todos
            .filter((todo) => todo.list === "Done")
            .map((task) => (
              <Card
                onDragStart={(e: DragEvent) => onDragStart(e, task)}
                task={task}
                key={task.id}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
