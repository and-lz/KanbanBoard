import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAppContext } from "../../../../AppContext";

const Toast = () => {
  let [visible, setVisible] = useState(false);
  const { toast } = useAppContext();

  useEffect(() => {
    toast && setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 5000);
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
            "linear-gradient(330deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.53125) 20%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0) 50%)",
        }}
        className={twMerge(
          "pointer-events-none fixed bottom-0 right-0 z-10 h-screen w-screen bg-black transition-all dark:invert",
          visible ? "translate-y-[0%]" : "translate-y-[100%]"
        )}
      ></div>
      <button onClick={handleClick}>
        <div
          className={twMerge(
            "fixed bottom-5 right-5 z-50 bg-white/50 p-3 px-5 shadow-2xl backdrop-blur-3xl transition-all hover:bg-white md:m-0",
            visible ? "translate-y-[0%]" : "translate-y-[150%]"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{toast}</span>
          </div>
        </div>
      </button>
    </>
  );
};

export default Toast;
