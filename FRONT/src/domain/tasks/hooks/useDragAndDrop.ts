import { useAppContext } from "../../../AppContext";
import { moveItemInArray } from "../components/Column/helper";
import { Task } from "../services/types";
import { useTaskManager } from "./useTaskManager";
import { useTransition } from "./useViewTransition";

export function useDragAndDrop() {
  const { tasks, update: updateContext } = useAppContext();
  const { update } = useTaskManager();
  function moveTaskToListAndIndex(
    id: string,
    newColumn: string,
    newIndex: number
  ) {
    let newTasks = [...tasks];
    const index = newTasks.findIndex((todo) => todo.id === id);
    newTasks[index].lista = newColumn;
    moveItemInArray(newTasks, index, newIndex);
    updateContext({ tasks: newTasks });
  }

  async function onDrop(
    event: DragEvent,
    targetColumn: string,
    newIndex: number
  ) {
    const task: Task = JSON.parse(event.dataTransfer!.getData("task"));

    await update(task.id, {
      ...task,
      lista: targetColumn,
    });
    updateContext({ toast: `${task.titulo} movida para ${targetColumn}` });
    useTransition(() =>
      moveTaskToListAndIndex(task.id, targetColumn, newIndex)
    );
  }

  function onDragStart(event: DragEvent, task: Task) {
    event.dataTransfer!.setData("task", JSON.stringify(task));
  }

  function onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  return { onDrop, onDragStart, onDragOver };
}
