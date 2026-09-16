import { LuSearch, LuX } from "react-icons/lu";
import { Button } from "./Button";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar produtos...",
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-xl">
      <LuSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50
          pl-10 pr-10 text-sm text-gray-900 outline-none
          transition placeholder:text-gray-400 hover:border-gray-300
          focus:border-gray-400 focus:bg-white focus:ring-2focus:ring-gray-100"
      />
      {value.length > 0 && (
        <Button
          onClick={() => onChange("")}
          aria-label="Limpar pesquisa"
          className="absolute right-2 top-1/2 -translate-y-1/2
            cursor-pointer rounded-md p-1.5 text-gray-400
            transition-colors hover:bg-gray-200 hover:text-gray-700"
        >
          <LuX className="size-4" />
        </Button>
      )}
    </div>
  );
}
