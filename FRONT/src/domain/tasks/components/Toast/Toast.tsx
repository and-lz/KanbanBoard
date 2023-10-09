import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAppContext } from "../../../../AppContext";

const Toast = () => {
  let [visible, setVisible] = useState(true);
  const { toast } = useAppContext();

  useEffect(() => {
    toast && setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [toast]);

  function handleClick() {
    setVisible(false);
  }

  if (!toast) return;

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(330deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.53125) 10%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0) 40%)",
        }}
        className={twMerge(
          "pointer-events-none fixed bottom-0 right-0 z-10 h-screen w-screen bg-black transition-all",
          visible ? "translate-y-[0%]" : "translate-y-[100%]"
        )}
      ></div>
      <button onClick={handleClick}>
        <div
          className={twMerge(
            "fixed bottom-5 right-5 z-50 bg-black rounded-lg p-2 px-5 shadow-2xl backdrop-blur-3xl transition-all md:m-0 text-white",
            visible ? "translate-y-[0%]" : "translate-y-[150%]"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm uppercase">
              {"<"}
              {toast}
              {" />"}
            </span>
          </div>
        </div>
      </button>
    </>
  );
};

export default Toast;
