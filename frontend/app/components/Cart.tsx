import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { LuTag } from "react-icons/lu";
import { Button } from "./ui/Button";
import { CgClose } from "react-icons/cg";

export interface CartItem {
  id: number;
  name: string;
  unitValue: number;
  amount: number;
}

interface CartProps {
  items: CartItem[];
  cupom: Cupom | undefined;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  onCouponChange: (value: string) => void;
  onChangeAmount: (id: number, value: number) => void;
  onApplyCoupon: () => void;
  onCheckout: () => void;
  setCupom: (value?: Cupom) => void;
  cupomSearch: string;
  cupomLoading: boolean;
  cupomError: string;
  checkoutLoading: boolean;
  checkoutError: string;
}

export function Cart({
  items,
  cupom,
  setCupom,
  onIncrease,
  onDecrease,
  onRemove,
  onApplyCoupon,
  cupomError,
  onCheckout,
  onCouponChange,
  onChangeAmount,
  cupomSearch,
  cupomLoading,
  checkoutLoading,
  checkoutError
}: CartProps) {
  const subtotal = items.reduce(
    (total, item) => total + item.unitValue * item.amount,
    0,
  );

  const discount = cupom
    ? cupom.type === "Percentage"
      ? subtotal * (cupom.value / 100)
      : cupom.value
    : 0;

  const total = Math.max(subtotal - discount, 0);

  const totalItems = items.reduce((total, item) => total + item.amount, 0);

  return (
    <div className="flex h-full min-h-0 flex-col justify-between overflow-y-auto">
      <div>
        <div className="border-b border-gray-200 px-6 pb-5">
          <h2 className="text-xl font-semibold text-gray-900">Seu carrinho</h2>
          <p className="mt-1 text-sm text-gray-500">
            {totalItems === 0
              ? "Seus produtos aparecerão aqui."
              : `${totalItems} ${
                  totalItems === 1 ? "item" : "itens"
                } no carrinho`}
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-gray-400 py-4">
                Seu carrinho está vazio.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate font-medium text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.unitValue.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>

                    <Button
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remover ${item.name}`}
                      className="cursor-pointer rounded-md p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <FaTrash className="size-4" />
                    </Button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 p-1">
                      <Button
                        onClick={() => onDecrease(item.id)}
                        className="cursor-pointer p-2.5 text-gray-500 transition-color shover:bg-gray-100"
                      >
                        <FaMinus className="size-3" />
                      </Button>
                      <input
                        type="number"
                        min={1}
                        step={1}
                        value={item.amount}
                        onChange={(event) => {
                          const value = Number(event.target.value);
                          onChangeAmount(
                            item.id,
                            Math.min(Math.max(value, 1), 100),
                          );
                        }}
                        className="w-12 appearance-none border-x border-gray-200 text-center text-sm font-medium outline-none"
                      />

                      <Button
                        onClick={() => onIncrease(item.id)}
                        className="cursor-pointer p-2.5 text-gray-500 transition-colors hover:bg-gray-100"
                      >
                        <FaPlus className="size-3" />
                      </Button>
                    </div>

                    <span className="font-semibold text-gray-900">
                      {(item.unitValue * item.amount).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white p-6 ">
        {cupom ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700">
                  <LuTag className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">
                    Cupom aplicado
                  </p>

                  <p className="mt-0.5 text-sm font-medium text-green-700">
                    {cupom.code}
                  </p>
                  <p className="mt-1 text-xs text-green-600">
                    {cupom.type === "Percentage"
                      ? `${cupom.value}% de desconto`
                      : `${cupom.value.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })} de desconto`}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setCupom()}
                className="cursor-pointer rounded-md p-1.5 text-green-600 transition-colors hover:bg-green-100"
                aria-label="Remover cupom"
              >
                <CgClose className="size-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <label
              htmlFor="coupon"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Cupom de desconto
            </label>
            <div className="flex gap-2">
              <div className="relative min-w-0 flex-1">
                <LuTag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="coupon"
                  type="text"
                  value={cupomSearch}
                  onChange={(e) => onCouponChange(e.target.value)}
                  placeholder="Digite seu cupom"
                  className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />
              </div>
              <Button
                disabled={cupomLoading}
                onClick={onApplyCoupon}
                className="cursor-pointer rounded-lg border border-gray-200 px-4 text-sm font-medium transition-colors hover:bg-gray-100"
              >
                Aplicar
              </Button>
            </div>
          </div>
        )}
        {!!cupomError && (
          <p className="mt-2 text-sm text-red-500">{cupomError}</p>
        )}
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Subtotal</span>

            <span className="text-sm font-medium text-gray-900">
              {subtotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          {cupom && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700">Desconto</span>

              <span className="text-sm font-medium text-green-700">
                -{" "}
                {discount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold text-gray-900">
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <Button
            disabled={items.length === 0 || checkoutLoading}
            onClick={onCheckout}
            className="w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition-colors
            hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            Finalizar compra
          </Button>
          {!!checkoutError && (
            <p className="mt-2 text-sm text-red-500">{checkoutError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
