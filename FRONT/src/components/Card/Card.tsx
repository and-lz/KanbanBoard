import { useId, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Task } from "../../App";
import Navigation from "./Navigation";
import EditMode from "./EditMode";
import { useViewTransition } from "../../hooks/useViewTransition";

interface Props {
  task: Task;
  isEditing?: boolean;
  onDragStart: any;
}

function Card(props: Props) {
  const { task, isEditing, onDragStart } = props;
  const { title, description } = task;
  const [editMode, setEditMode] = useState(isEditing);
  return (
    <>
      <div
        id={useId()}
        draggable
        style={{ viewTransitionName: "card-" + task.id }}
        onDragStart={onDragStart}
        className={twMerge(
          "card bg-black/80 hover:bg-black rounded-lg p-3 mb-4 hover:shadow-lg transition-all group text-white border-2 border-transparent focus-within:border-green"
        )}
      >
        {!editMode && (
          <button
            className="cursor-pointer focus:outline-none w-full text-left"
            onClick={() => setEditMode(true)}
          >
            <span className="text-lg font-bold mb-3 block">{title}</span>
            <p className="text-sm opacity-60">{description}</p>
          </button>
        )}
        {editMode && (
          <EditMode
            task={task}
            onFinishEditing={() => useViewTransition(() => setEditMode(false))}
          />
        )}
        {!editMode && <Navigation task={task} />}
      </div>
    </>
  );
}

export default Card;
