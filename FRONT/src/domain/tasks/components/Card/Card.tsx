import { useId, useState } from "react";
import { useTransition } from "../../hooks/useViewTransition";
import { Task } from "../../services/types";
import EditMode from "./EditMode/EditMode";
import Navigation from "./Navigation/Navigation";

interface Props {
  task: Task;
  isEditing?: boolean;
  onDragStart: any;
}

function Card(props: Props) {
  const { task, isEditing, onDragStart } = props;
  const { titulo, conteudo } = task;
  const [isEditMode, setEditMode] = useState(isEditing);
  return (
    <div
      id={useId()}
      draggable
      onDragStart={onDragStart}
      className={
        "card min-w-[400px] cursor-grab active:animate-pulse active:cursor-grab bg-black/80 hover:bg-black rounded-lg p-3 hover:shadow-lg transition-all group text-white border-2 border-transparent focus-within:border-green"
      }
      style={{ viewTransitionName: "card-" + task.id }}
    >
      {!isEditMode && (
        <button
          className="cursor-pointer focus:outline-none w-full text-left"
          onClick={() => setEditMode(true)}
          title="Editar"
        >
          <span className="text-lg font-bold mb-3 block">{titulo}</span>
          <p className="text-sm opacity-60">{conteudo}</p>
        </button>
      )}
      {isEditMode && (
        <EditMode task={task} onFinishEditing={() => setEditMode(false)} />
      )}
      {!isEditMode && <Navigation task={task} />}
    </div>
  );
}

export default Card;
