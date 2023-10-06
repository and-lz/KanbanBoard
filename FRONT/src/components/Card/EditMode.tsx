import { twMerge } from "tailwind-merge";
import { Task } from "../../App";
import TextButton from "../TextButton/TextButton";

interface Props {
  task: Task;
  onFinishEditing: () => void;
}

function EditMode(props: Props) {
  const {
    task: { title, description },
    onFinishEditing,
  } = props;

  const titleClasses = "text-lg font-bold mb-3 block";
  const inputClasses = "w-full bg-white/10 p-2 rounded-lg";

  return (
    <div>
      <input
        className={twMerge("text-sm", titleClasses, inputClasses)}
        type="text"
        placeholder="Titulo"
        defaultValue={title}
      />
      <input
        className={twMerge("text-sm", inputClasses)}
        type="text"
        placeholder="Descrição..."
        defaultValue={description}
      />
      <div className="flex justify-end">
        <TextButton onClick={onFinishEditing} className="mt-5">
          Salvar
        </TextButton>
      </div>
    </div>
  );
}

export default EditMode;
