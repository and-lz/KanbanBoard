import { useAppContext } from "../../../AppContext";
import { queryClient } from "../../../main";
import { createTask, deleteTask, updateTask } from "../services/services";
import { List, Task } from "../services/types";

const ERROR_MESSAGE = "Não foi possível realizar a ação solicitada";

export function useTaskManager() {
  const { update: updateContext } = useAppContext();

  async function tryAndCatchWithErrorMessage(functionToTry: Function) {
    try {
      await functionToTry();
    } catch (e) {
      updateContext({ toast: ERROR_MESSAGE });
    }
  }

  async function update(id: string, task: Task) {
    if (!task) return;

    tryAndCatchWithErrorMessage(async () => {
      await updateTask(id, {
        ...task,
      });
      updateContext({ toast: `${task.titulo} foi atualizada.` });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });
  }

  async function remove(taskId: string) {
    tryAndCatchWithErrorMessage(async () => {
      await deleteTask(taskId);
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });
  }

  function moveTo(task: Task, direction: "next" | "prev") {
    if (!task) return;

    tryAndCatchWithErrorMessage(async () => {
      let newList = "";
      if (direction === "next") {
        if (task.lista === List.ToDo) newList = List.Doing;
        if (task.lista === List.Doing) newList = List.Done;
      }
      if (direction === "prev") {
        if (task.lista === List.Done) newList = List.Doing;
        if (task.lista === List.Doing) newList = List.ToDo;
      }
      await update(task.id, {
        id: task.id,
        titulo: task.titulo,
        conteudo: task.conteudo,
        lista: newList,
      });
      updateContext({ toast: `${task.titulo} foi movida para ${newList}` });
    });
  }

  async function createTaskInColumn(column: List) {
    tryAndCatchWithErrorMessage(async () => {
      await createTask(column);
      updateContext({ toast: `Nova tarefa criada.` });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });
  }

  return { update, remove, moveTo, createTaskInColumn };
}
