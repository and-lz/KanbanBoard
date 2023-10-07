import { twMerge } from "tailwind-merge";
import { Task } from "../../App";
import TextButton from "../TextButton/TextButton";
import { deleteTask, updateTask } from "../../services/services";
import { useRef } from "react";
import { queryClient } from "../../main";

interface Props {
  task: Task;
  onFinishEditing: () => void;
}

function EditMode(props: Props) {
  const { task, onFinishEditing } = props;
  const formRef = useRef();

  const inputClasses =
    "w-full bg-white/10 p-2 rounded-lg mb-5 focus:outline-none focus:bg-white focus:text-black";
  const labelClasses = "mb-1 uppercase text-sm block opacity-70";

  function onSave() {
    const data = new FormData(formRef.current);
    updateTask(task.id, {
      ...task,
      titulo: String(data.get("titulo")),
      conteudo: String(data.get("conteudo")),
    });
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
    onFinishEditing();
  }

  function onDelete() {
    deleteTask(task.id).then(() => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onFinishEditing();
    });
  }

  return (
    <form ref={formRef}>
      <label htmlFor="title" className={labelClasses}>
        Título:
      </label>
      <input
        id="title"
        className={twMerge("text-sm", inputClasses)}
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
        className={twMerge("text-sm", inputClasses)}
        placeholder="Descrição..."
        defaultValue={task.conteudo}
      />
      <div className="flex justify-between">
        <TextButton onClick={onFinishEditing} className="mt-5">
          Cancelar
        </TextButton>
        <TextButton onClick={onDelete} className="mt-5">
          Apagar
        </TextButton>
        <TextButton onClick={onSave} className="mt-5">
          Salvar
        </TextButton>
      </div>
    </form>
  );
}

export default EditMode;
