import { Dispatch, SetStateAction } from "react";
import { Task } from "../../App";
import { useAppContext } from "../../AppContext";
import { useViewTransition } from "../../hooks/useViewTransition";

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
      if (task.list === "ToDo") newList = "Doing";
      if (task.list === "Doing") newList = "Done";
    }
    if (direction === "prev") {
      if (task.list === "Done") newList = "Doing";
      if (task.list === "Doing") newList = "ToDo";
    }

    updatedTodos.find((todo) => todo.id === task.id)!.list = newList;
    useViewTransition(() => update({ tasks: updatedTodos }));
  }

  const classes =
    "bg-black hover:bg-green text-2xl transition-all rounded-full h-10 w-10 outline-none focus:bg-green focus:text-black hover:text-black";

  return (
    <div className="mt-5 h-0 overflow-hidden focus-within:overflow-none focus-within:h-12 transition-all group-hover:overflow-none group-hover:h-12">
      <div className="flex flex-rox justify-between mt-2">
        {task.list !== "ToDo" && (
          <button onClick={() => handleChangeList("prev")} className={classes}>
            ←{" "}
            <span className="sr-only">Mover {task.title} para a esquerda</span>
          </button>
        )}
        {task.list !== "Done" && (
          <>
            <button
              onClick={() => handleChangeList("next")}
              className={classes}
            >
              →{" "}
              <span className="sr-only">
                Mover {task.title} para próxima coluna
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
