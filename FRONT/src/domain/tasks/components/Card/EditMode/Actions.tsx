import { useAppContext } from "../../../../../AppContext";
import { useTaskManager } from "../../../hooks/useTaskManager";
import { Task } from "../../../services/types";
import TextButton from "../../TextButton/TextButton";

interface Props {
  task: Task;
  formRef: React.RefObject<HTMLFormElement>;
  onFinishEditing: () => void;
}

function Actions(props: Props) {
  const { task, onFinishEditing, formRef } = props;
  const { update: updateContext } = useAppContext();
  const { update, remove } = useTaskManager();

  async function handleSave() {
    const data = new FormData(formRef.current);
    const titulo = String(data.get("titulo"));
    const conteudo = String(data.get("conteudo"));

    if (!titulo || !conteudo)
      return updateContext({ toast: "Preencha o título e descrição." });

    await update(task.id, {
      id: task.id,
      lista: task.lista,
      titulo,
      conteudo,
    });
  }

  return (
    <div className="flex justify-between">
      <TextButton onClick={onFinishEditing} className="mt-5">
        Cancelar
      </TextButton>
      <TextButton onClick={() => remove(task.id)} className="mt-5">
        Apagar
      </TextButton>
      <TextButton type="button" onClick={handleSave} className="mt-5">
        Salvar
      </TextButton>
    </div>
  );
}

export default Actions;
