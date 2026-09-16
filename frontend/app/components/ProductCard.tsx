import { FaCartPlus } from "react-icons/fa";
import { Button } from "./ui/Button";

interface Product {
  id: number;
  name: string;
  description?: string;
  unitValue: number;
  stockAmount: number;
}

interface ProductCardProps {
  product: Product;
  included: boolean;
  onAdd: (product: Product) => void;
}

export function ProductCard({
  product,
  included = false,
  onAdd,
}: ProductCardProps) {
  const available = product.stockAmount > 0;

  return (
    <article className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex aspect-[4/3] items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
        Imagem do produto
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h2 className="font-semibold">{product.name}</h2>

          <span
            className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium
              ${
                available
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }
            `}
          >
            {available ? `${product.stockAmount} disponíveis` : "Sem estoque"}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        <div className="mt-auto pt-6">
          <p className="mb-4 text-xl font-bold">
            {product.unitValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <Button
            onClick={() => {
              onAdd(product);
            }}
            disabled={!available || included}
            className="flex w-full items-center justify-center gap-2 rounded-lg
            bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors
            hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            <FaCartPlus />
            {available ? "Adicionar ao carrinho" : "Indisponível"}
          </Button>
        </div>
      </div>
    </article>
  );
}
