import { flushSync } from "react-dom";
import { useAppContext } from "../../../../AppContext";
import { useTransition } from "../../hooks/useViewTransition";
import Card from "../Card/Card";
import DropArea from "../DropArea/DropArea";
import React from "react";
import { createTask, updateTask } from "../../services/services";
import TextButton from "../TextButton/TextButton";
import { queryClient } from "../../../../main";
import { List, Task } from "../../services/types";

interface Props {
  title: string;
  id: List;
  showAddTaskButton?: boolean;
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
  const { id, title, showAddTaskButton = false } = props;
  const { tasks, update } = useAppContext();

  function onDrop(event: DragEvent, targetColumn: string, newIndex: number) {
    const taskId = event.dataTransfer!.getData("task");
    const task = tasks.find((task) => task.id === taskId)!;

    updateTask(taskId, {
      ...task,
      lista: targetColumn,
    }).then(() => {
      useTransition(() => handleChangeList(taskId, targetColumn, newIndex));
    });
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

  function createNewTask(column: List) {
    createTask(column).then(() =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    );
  }

  return (
    <div
      className="flex-1 border-2 border-white/10 backdrop-blur-md p-4 rounded-lg shadow-inner"
      onDragOver={(e) => e.preventDefault()}
    >
      <h2 className="mb-5 overflow-auto text-center text-white text-xl font-extrabold uppercase">
        {"<"}
        {title} {"/>"}
      </h2>
      <div className="h-[70vh] overflow-auto">
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
      {showAddTaskButton && (
        <div className="flex justify-center mt-3">
          <TextButton onClick={() => createNewTask(id)} className="text-white">
            Criar nova tarefa
          </TextButton>
        </div>
      )}
    </div>
  );
}

export default Column;