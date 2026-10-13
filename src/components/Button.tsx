import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export const Button = ({ children }: ButtonProps) => {
  return (
    <button className="w-fit flex items-center py-2 px-4 bg-violet-700 text-inherit rounded-md cursor-pointer transition-colors hover:bg-violet-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-violet-700 border-2 border-violet-700">
      {children}
    </button>
  );
};
