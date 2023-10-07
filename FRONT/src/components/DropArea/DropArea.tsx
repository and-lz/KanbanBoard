import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  onDrop: any;
}

function DropArea(props: Props) {
  const { onDrop } = props;
  const [isVisible, setIsVisible] = useState(false);

  function showArea() {
    setIsVisible(true);
  }

  function hideArea() {
    setIsVisible(false);
  }

  return (
    <div
      className={twMerge(
        "h-[15px] border-2 border-dashed rounded-lg my-2 only:h-[100%!important] transition-all",
        isVisible
          ? "border-white/50 h-[200px]"
          : "bg-transparent border-transparent"
      )}
      onDragEnter={showArea}
      onDragLeave={hideArea}
      onDrop={(e) => {
        onDrop(e);
        hideArea();
      }}
    ></div>
  );
}

export default DropArea;
