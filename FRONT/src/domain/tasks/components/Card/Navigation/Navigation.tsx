import { useTaskManager } from "../../../hooks/useTaskManager";
import { List, Task } from "../../../services/types";

interface Props {
  task: Task;
}

function Navigation(props: Props) {
  const { task } = props;
  const { lista, titulo } = task;
  const { moveTo } = useTaskManager(task);

  const classes =
    "bg-black hover:bg-green text-2xl transition-all rounded-full h-10 w-10 outline-none focus:bg-green focus:text-black hover:text-black";

  const hasPrev = lista !== List.ToDo;
  const hasNext = lista !== List.Done;

  return (
    <div className="mt-5 h-0 overflow-hidden focus-within:overflow-none focus-within:h-12 transition-all">
      <div className="flex flex-rox justify-between mt-2">
        {hasPrev && (
          <button onClick={() => moveTo("prev")} className={classes}>
            ← <span className="sr-only">Mover {titulo} para a esquerda</span>
          </button>
        )}
        {hasNext && (
          <>
            <button onClick={() => moveTo("next")} className={classes}>
              →{" "}
              <span className="sr-only">
                Mover {titulo} para próxima coluna
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
