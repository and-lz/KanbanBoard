import { useTaskManager } from "../../../hooks/useManageTask";
import { Task } from "../../../services/types";
import TextButton from "../../TextButton/TextButton";

interface Props {
  task: Task;
  formRef: any;
  onFinishEditing: () => void;
}

function Actions(props: Props) {
  const { task, onFinishEditing, formRef } = props;
  const { update, remove } = useTaskManager(task);

  return (
    <div className="flex justify-between">
      <TextButton onClick={onFinishEditing} className="mt-5">
        Cancelar
      </TextButton>
      <TextButton onClick={remove} className="mt-5">
        Apagar
      </TextButton>
      <TextButton
        onClick={async () => {
          const data = new FormData(formRef.current);
          await update({
            titulo: String(data.get("titulo")),
            conteudo: String(data.get("conteudo")),
          });
        }}
        className="mt-5"
      >
        Salvar
      </TextButton>
    </div>
  );
}

export default Actions;
