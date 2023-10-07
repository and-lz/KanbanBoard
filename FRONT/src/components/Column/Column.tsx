import { flushSync } from "react-dom";
import { Task } from "../../App";
import { useAppContext } from "../../AppContext";
import { useTransition } from "../../hooks/useViewTransition";
import Card from "../Card/Card";
import DropArea from "../DropArea/DropArea";
import React from "react";

interface Props {
  title: string;
  id: "ToDo" | "Doing" | "Done";
}

function moveItemInArray<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  if (
    fromIndex < 0 ||
    fromIndex >= arr.length ||
    toIndex < 0 ||
    toIndex >= arr.length
  ) {
    throw new Error("Invalid indices");
  }

  const itemToMove = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, itemToMove);

  return arr;
}

function Column(props: Props) {
  const { id, title } = props;
  const { tasks, update } = useAppContext();

  console.log({ tasks });

  function onDrop(event: DragEvent, targetColumn: string, newIndex: number) {
    const task = event.dataTransfer!.getData("task");
    useTransition(() => handleChangeList(task, targetColumn, newIndex));
  }

  function handleChangeList(id: string, newColumn: string, newIndex: number) {
    let newTasks = [...tasks];
    const index = newTasks.findIndex((todo) => todo.id === id);
    newTasks[index].lista = newColumn;
    moveItemInArray(newTasks, index, newIndex);
    flushSync(() => update({ tasks: newTasks }));
  }

  function onDragStart(event: DragEvent, task: Task) {
    event.dataTransfer!.setData("task", task.id);
  }

  return (
    <div
      className="flex-1 bg-white/5 p-4 rounded-lg"
      onDragOver={(e) => e.preventDefault()}
    >
      <h2 className="mb-5 text-white text-xl font-extrabold">{title}</h2>
      <div className="h-full">
        <DropArea onDrop={(e: DragEvent) => onDrop(e, id, 0)} />
        {tasks
          .filter((todo) => todo.lista === id)
          .map((task, index) => (
            <React.Fragment key={task.id}>
              <Card
                onDragStart={(e: DragEvent) => onDragStart(e, task)}
                task={task}
                key={task.id}
              />
              <DropArea onDrop={(e: DragEvent) => onDrop(e, id, index + 1)} />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default Column;
