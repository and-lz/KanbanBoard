import { flushSync } from "react-dom";
import { Task } from "../../App";
import { useAppContext } from "../../AppContext";
import { useViewTransition } from "../../hooks/useViewTransition";
import Card from "../Card/Card";

interface Props {
  list: "ToDo" | "Doing" | "Done";
}

function Column(props: Props) {
  const { list } = props;
  const { tasks, update } = useAppContext();

  function onDrop(event: DragEvent, targetColumn: string) {
    const task = event.dataTransfer!.getData("task");
    useViewTransition(() => handleChangeList(task, targetColumn));
  }

  function handleChangeList(id: string, newColumn: string) {
    const newTasks = [...tasks];
    newTasks.find((todo) => todo.id === id)!.list = newColumn;
    flushSync(() => update({ tasks: newTasks }));
  }

  function onDragStart(event: DragEvent, task: Task) {
    event.dataTransfer!.setData("task", task.id);
  }

  return (
    <div
      className="flex-1"
      onDrop={(e) => onDrop(e, list)}
      onDragOver={(e) => e.preventDefault()}
    >
      <h2 className="mb-5 text-white text-xl font-extrabold">{list}</h2>
      {tasks
        .filter((todo) => todo.list === list)
        .map((task) => (
          <Card
            onDragStart={(e: DragEvent) => onDragStart(e, task)}
            task={task}
            key={task.id}
          />
        ))}
    </div>
  );
}

export default Column;
