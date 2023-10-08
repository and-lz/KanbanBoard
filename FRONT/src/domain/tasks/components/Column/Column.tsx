import React from "react";
import { useAppContext } from "../../../../AppContext";
import { queryClient } from "../../../../main";
import { useTransition } from "../../hooks/useViewTransition";
import { createTask, updateTask } from "../../services/services";
import { List, Task } from "../../services/types";
import Card from "../Card/Card";
import DropArea from "../DropArea/DropArea";
import TextButton from "../TextButton/TextButton";
import { moveItemInArray } from "./helper";

interface Props {
  title: string;
  id: List;
  showAddTaskButton?: boolean;
}

function Column(props: Props) {
  const { id, title, showAddTaskButton = false } = props;
  const { tasks, update } = useAppContext();

  async function onDrop(
    event: DragEvent,
    targetColumn: string,
    newIndex: number
  ) {
    const task: Task = JSON.parse(event.dataTransfer!.getData("task"));

    await updateTask(task.id, {
      ...task,
      lista: targetColumn,
    });
    useTransition(() =>
      moveTaskToListAndIndex(task.id, targetColumn, newIndex)
    );
  }

  function moveTaskToListAndIndex(
    id: string,
    newColumn: string,
    newIndex: number
  ) {
    let newTasks = [...tasks];
    const index = newTasks.findIndex((todo) => todo.id === id);
    newTasks[index].lista = newColumn;
    moveItemInArray(newTasks, index, newIndex);
    update({ tasks: newTasks });
  }

  function onDragStart(event: DragEvent, task: Task) {
    event.dataTransfer!.setData("task", JSON.stringify(task));
  }

  async function createNewTask(column: List) {
    await createTask(column);
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  }

  return (
    <div
      className="flex-1 border-2 border-white/10 backdrop-blur-md p-4 rounded-lg shadow-inner"
      onDragOver={(e) => e.preventDefault()}
    >
      <h2 className="mb-5 overflow-auto text-center text-white text-xl -mt-10 rounded-full border-2 font-extrabold uppercase border-white/10 max-w-[max-content]  bg-white/10 backdrop-blur-3xl p-1 px-6">
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
