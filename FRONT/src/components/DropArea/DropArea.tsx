import { useState } from "react";

interface Props {}

function DropArea(props: Props) {
  const {} = props;
  const [isVisible, setIsVisible] = useState(false);

  function showArea() {
    setIsVisible(true);
  }

  function hideArea() {
    setIsVisible(false);
  }

  return (
    <div
      className={isVisible && "bg-slate-500"}
      onDragEnter={showArea}
      onDragLeave={hideArea}
    >
      drop here
    </div>
  );
}

export default DropArea;
