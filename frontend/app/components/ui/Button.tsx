import type { LabelHTMLAttributes, MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Button({
  onClick,
  disabled = false,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex cursor-pointer items-center gap-2 rounded-lg
        bg-gray-900 px-4 py-2 text-sm font-medium
        text-white transition-colors hover:bg-gray-700 ${className}`}
    >
      {children}
    </button>
  );
}
