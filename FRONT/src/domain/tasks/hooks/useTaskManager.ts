import { useAppContext } from "../../../AppContext";
import { queryClient } from "../../../main";
import { deleteTask, updateTask } from "../services/services";
import { List, Task } from "../services/types";

const ERROR_MESSAGE = "Não foi possível realizar a ação solicitada";

export function useTaskManager(task: Task) {
  const { id } = task;
  const { update: updateContext } = useAppContext();

  async function tryAndCatchWithErrorMessage(functionToTry: Function) {
    try {
      await functionToTry();
    } catch (e) {
      updateContext({ toast: ERROR_MESSAGE });
    }
  }

  async function update(data: Partial<Task>) {
    tryAndCatchWithErrorMessage(async () => {
      await updateTask(id, {
        ...task,
        ...data,
      });
      updateContext({ toast: `${task.titulo} foi atualizada.` });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });
  }

  async function remove() {
    tryAndCatchWithErrorMessage(async () => {
      await deleteTask(id);
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });
  }

  function moveTo(direction: "next" | "prev") {
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
      await update({
        lista: newList,
      });
      updateContext({ toast: `${task.titulo} foi movida para ${newList}` });
    });
  }

  return { update, remove, moveTo };
}
