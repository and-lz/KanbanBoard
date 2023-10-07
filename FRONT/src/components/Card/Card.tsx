import { useId, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Task } from "../../App";
import { useTransition } from "../../hooks/useViewTransition";
import EditMode from "./EditMode";
import Navigation from "./Navigation";

interface Props {
  task: Task;
  isEditing?: boolean;
  onDragStart: any;
}

function Card(props: Props) {
  const { task, isEditing, onDragStart } = props;
  const { titulo, conteudo } = task;
  const [editMode, setEditMode] = useState(isEditing);
  return (
    <>
      <div
        id={useId()}
        draggable
        style={{ viewTransitionName: "card-" + task.id }}
        onDragStart={onDragStart}
        className={twMerge(
          "card cursor-grab active:animate-pulse active:cursor-grab bg-black/80 hover:bg-black rounded-lg p-3 hover:shadow-lg transition-all group text-white border-2 border-transparent focus-within:border-green"
        )}
      >
        {!editMode && (
          <button
            className="cursor-pointer focus:outline-none w-full text-left"
            onClick={() => setEditMode(true)}
          >
            <span className="text-lg font-bold mb-3 block">{titulo}</span>
            <p className="text-sm opacity-60">{conteudo}</p>
          </button>
        )}
        {editMode && (
          <EditMode
            task={task}
            onFinishEditing={() => useTransition(() => setEditMode(false))}
          />
        )}
        {!editMode && <Navigation task={task} />}
      </div>
    </>
  );
}

export default Card;
