import { useId, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Task } from "../../App";
import Navigation from "./Navigation";

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

  return (
    <>
      <div
        id={useId()}
        draggable
        onDragStart={onDragStart}
        className={twMerge(
          "bg-black/80 hover:bg-black backdrop-blur-3xl rounded-lg p-3 mb-4 hover:shadow-lg transition-all group text-white"
        )}
      >
        {!editMode && (
          <div onClick={() => setEditMode(true)}>
            <span className={titleClasses}>{title}</span>
            <p className="text-sm">{description}</p>
          </div>
        )}
        {editMode && (
          <div>
            <input
              className={twMerge("text-sm", titleClasses, inputClasses)}
              type="text"
              placeholder="Titulo"
              defaultValue={title}
              onBlur={() => setEditMode(false)}
            />
            <input
              className={twMerge("text-sm", inputClasses)}
              type="text"
              placeholder="Descrição..."
              defaultValue={description}
              onBlur={() => setEditMode(false)}
            />
          </div>
        )}
        {!editMode && <Navigation task={task} />}
      </div>
    </>
  );
}

export default Card;
