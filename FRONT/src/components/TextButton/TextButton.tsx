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
        `uppercase text-sm after:content-["→"] after:pl-1 hover:underline`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default TextButton;
