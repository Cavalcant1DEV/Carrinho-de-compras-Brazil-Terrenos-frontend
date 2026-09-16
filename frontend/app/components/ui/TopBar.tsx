import type { ReactNode } from "react";
import { FaStore } from "react-icons/fa";

interface TopBarProps {
  children?: ReactNode;
  search?: ReactNode;
}

export function TopBar({ children, search }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-gray-900 text-white">
            <FaStore className="size-4" />
          </div>
          <div>
            <span className="block font-semibold leading-none">
              Brasil Terrenos
            </span>

            <span className="text-xs text-gray-500">Catálogo</span>
          </div>
        </div>
        <div className="flex flex-1 justify-center">{search}</div>
        <div className="flex shrink-0 items-center gap-3">{children}</div>
      </div>
    </header>
  );
}
