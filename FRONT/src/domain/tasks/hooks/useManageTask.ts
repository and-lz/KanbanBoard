import { queryClient } from "../../../main";
import { deleteTask, updateTask } from "../services/services";
import { List, Task } from "../services/types";

export function useTaskManager(task: Task) {
  const { id } = task;

  async function update(data: Partial<Task>) {
    await updateTask(id, {
      ...task,
      ...data,
    });
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  }

  async function remove() {
    await deleteTask(id);
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  }

  function moveTo(direction: "next" | "prev") {
    let newList = "";
    if (direction === "next") {
      if (task.lista === List.ToDo) newList = List.Doing;
      if (task.lista === List.Doing) newList = List.Done;
    }
    if (direction === "prev") {
      if (task.lista === List.Done) newList = List.Doing;
      if (task.lista === List.Doing) newList = List.ToDo;
    }
    update({
      lista: newList,
    });
  }

  return { update, remove, moveTo };
}
