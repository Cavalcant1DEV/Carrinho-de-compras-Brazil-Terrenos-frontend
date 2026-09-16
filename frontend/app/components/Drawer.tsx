import { CgClose } from "react-icons/cg";
import { Button } from "./ui/Button";
import type { ReactNode } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  variant?: "default" | "end";
  background?: "none" | "untilClose" | "default";
  children?: ReactNode;
}

export function Drawer({
  open,
  onClose,
  variant = "default",
  background = "default",
  children,
}: DrawerProps) {
  const isEnd = variant === "end";

  const positionClass = isEnd
    ? `right-0 ${open ? "translate-x-0" : "translate-x-full"}`
    : `left-0 ${open ? "translate-x-0" : "-translate-x-full"}`;

  const canCloseBackground = background === "default";

  return (
    <>
      {/* Background opaco */}
      {background != "none" && (
        <div
          onClick={canCloseBackground ? onClose : undefined}
          className={`
          fixed inset-0 z-40 bg-black/50
          transition-opacity duration-300
          ${open ? "opacity-100" : "pointer-events-none opacity-0"}
        `}
        />
      )}
      <aside
        className={`
          fixed top-0 z-50
          h-screen w-96
          bg-white shadow-xl
          transition-transform duration-300
          ${positionClass}
        `}
      >
        <div className="flex items-center justify-end p-4">
          <Button onClick={onClose}>
            <CgClose className="size-6" />
          </Button>
        </div>

        <div className="p-6">{children}</div>
      </aside>
    </>
  );
}
