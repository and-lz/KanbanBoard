import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const TextButton = ({ children, className, ...rest }: Props) => {
  return (
    <button
      className={twMerge(
        `uppercase whitespace-nowrap text-sm after:content-["→"] after:pl-1 focus:outline-none focus:bg-green focus:text-black p-1 px-3 rounded-lg hover:bg-green hover:text-black transition-colors`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default TextButton;
