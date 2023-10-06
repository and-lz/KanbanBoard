import { useId, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Task } from "../../App";
import Navigation from "./Navigation";
import EditMode from "./EditMode";

interface Props {
  task: Task;
  isEditing?: boolean;
  onDragStart: any;
}

function Card(props: Props) {
  const { task, isEditing, onDragStart } = props;
  const { title, description } = task;
  const [editMode, setEditMode] = useState(isEditing);

  const titleClasses = "text-lg font-bold mb-3 block";
  const inputClasses = "w-full bg-slate-100";

  const cardRef = useRef(null);

  return (
    <>
      <div
        ref={cardRef}
        id={useId()}
        draggable
        onDragStart={onDragStart}
        className={twMerge(
          "bg-black/80 hover:bg-black backdrop-blur-3xl rounded-lg p-3 mb-4 hover:shadow-lg transition-all group text-white border-2 border-transparent hover:border-green focus-within:border-green"
        )}
      >
        {!editMode && (
          <div onClick={() => setEditMode(true)}>
            <span className={titleClasses}>{title}</span>
            <p className="text-sm opacity-60">{description}</p>
          </div>
        )}
        {editMode && (
          <EditMode task={task} onFinishEditing={() => setEditMode(false)} />
        )}
        {!editMode && <Navigation task={task} />}
      </div>
    </>
  );
}

export default Card;
