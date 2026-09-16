import { LuPackageSearch } from "react-icons/lu";

export function EmptyProducts() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 text-center">
      <div
        className="mb-4 flex size-14 items-center justify-center rounded-full bg-gray-100
        "
      >
        <LuPackageSearch className="size-6 text-gray-500" />
      </div>

      <h2 className="text-lg font-semibold text-gray-900">
        Nenhum produto encontrado
      </h2>

      <p className="mt-1 max-w-sm text-sm text-gray-500">
        Não encontramos produtos disponíveis no momento.
      </p>
    </div>
  );
}
