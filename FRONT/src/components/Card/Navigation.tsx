import { useAppContext } from "../../AppContext";
import { useTransition } from "../../hooks/useViewTransition";
import { updateTask } from "../../services/services";
import { List, Task } from "../../services/types";

interface Props {
  task: Task;
}

function Navigation(props: Props) {
  const { task } = props;
  const { tasks, update } = useAppContext();

  function handleChangeList(direction: "next" | "prev") {
    const updatedTodos = [...tasks];

    let newList = "";
    if (direction === "next") {
      if (task.lista === List.ToDo) newList = List.Doing;
      if (task.lista === List.Doing) newList = List.Done;
    }
    if (direction === "prev") {
      if (task.lista === List.Done) newList = List.Doing;
      if (task.lista === List.Doing) newList = List.ToDo;
    }

    updatedTodos.find((todo) => todo.id === task.id)!.lista = newList;

    updateTask(task.id, {
      ...task,
      lista: newList,
    });

    useTransition(() => update({ tasks: updatedTodos }));
  }

  const classes =
    "bg-black hover:bg-green text-2xl transition-all rounded-full h-10 w-10 outline-none focus:bg-green focus:text-black hover:text-black";

  return (
    <div className="mt-5 h-0 overflow-hidden focus-within:overflow-none focus-within:h-12 transition-all">
      {/* group-hover:overflow-none group-hover:h-12 */}
      <div className="flex flex-rox justify-between mt-2">
        {task.lista !== "ToDo" && (
          <button onClick={() => handleChangeList("prev")} className={classes}>
            ←{" "}
            <span className="sr-only">Mover {task.titulo} para a esquerda</span>
          </button>
        )}
        {task.lista !== List.Done && (
          <>
            <button
              onClick={() => handleChangeList("next")}
              className={classes}
            >
              →{" "}
              <span className="sr-only">
                Mover {task.titulo} para próxima coluna
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
