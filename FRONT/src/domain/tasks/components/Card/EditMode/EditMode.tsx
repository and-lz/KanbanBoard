import { Task } from "@/domain/tasks/services/types";
import { useRef } from "react";
import Actions from "./Actions";

interface Props {
  task: Task;
  onFinishEditing: () => void;
}

function EditMode(props: Props) {
  const { task, onFinishEditing } = props;
  const formRef = useRef<HTMLFormElement>(null);

  const inputClasses =
    "w-full bg-white/10 p-2 rounded-lg mb-5 focus:outline-none focus:bg-white focus:text-black text-sm";
  const labelClasses = "mb-1 uppercase text-sm block opacity-70";

  return (
    <form ref={formRef}>
      <label htmlFor="title" className={labelClasses}>
        Título:
      </label>
      <input
        id="title"
        className={inputClasses}
        type="text"
        name="titulo"
        required
        placeholder="Titulo"
        defaultValue={task.titulo}
      />
      <label htmlFor="description" className={labelClasses}>
        Descrição:
      </label>
      <textarea
        id="description"
        rows={5}
        required
        name="conteudo"
        className={inputClasses}
        placeholder="Descrição..."
        defaultValue={task.conteudo}
      />
      <Actions
        formRef={formRef}
        onFinishEditing={onFinishEditing}
        task={task}
      />
    </form>
  );
}

export default EditMode;
