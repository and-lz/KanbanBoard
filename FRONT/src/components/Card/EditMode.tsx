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

  const inputClasses =
    "w-full bg-white/10 p-2 rounded-lg mb-5 focus:outline-none focus:bg-white focus:text-black";
  const labelClasses = "mb-1 uppercase text-sm block opacity-70";

  return (
    <div>
      <label htmlFor="title" className={labelClasses}>
        Título:
      </label>
      <input
        id="title"
        className={twMerge("text-sm", inputClasses)}
        type="text"
        placeholder="Titulo"
        defaultValue={title}
      />
      <label htmlFor="description" className={labelClasses}>
        Descrição:
      </label>
      <textarea
        id="description"
        rows={5}
        className={twMerge("text-sm", inputClasses)}
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
