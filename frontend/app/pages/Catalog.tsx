import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { TopBar } from "~/components/ui/TopBar";
import { Drawer } from "~/components/Drawer";
import { ProductCard } from "~/components/ProductCard";
import { Button } from "~/components/ui/Button";
import { api } from "~/services/api";
import { ProductSkeleton } from "~/components/ui/ProductSkeleton";
import { EmptyProducts } from "~/components/ui/EmptyProduct";
import axios from "axios";
import { useDebounce } from "~/hooks/useDebounce";
import { SearchInput } from "~/components/ui/SearchInput";
import { Cart } from "~/components/Cart";
import toast from "react-hot-toast";

export function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [cupomSearch, setCupomSearch] = useState("");
  const [cupom, setCupom] = useState<Cupom>();
  const [cupomLoading, setCupomLoading] = useState(false);
  const [cupomError, setCupomError] = useState<string>("");

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  async function fetchProducts(
    pageToLoad = page,
    search = debouncedSearch,
    replace = false,
  ) {
    try {
      setLoading(true);

      const response = await api.get<PagedResponse<Product>>("/product", {
        params: {
          page: pageToLoad,
          pageSize: 10,
          name: search,
        },
      });

      setTotalPages(response.data.totalPages);

      setProducts((current) =>
        replace ? response.data.data : [...current, ...response.data.data],
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function updateCart(
    updater: CartItem[] | ((current: CartItem[]) => CartItem[]),
  ) {
    setCartItems((current) => {
      const updated =
        typeof updater === "function" ? updater(current) : updater;

      localStorage.setItem("cart", JSON.stringify(updated));

      return updated;
    });
  }

  function addToCart(product: Product) {
    updateCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                amount: item.amount + 1,
              }
            : item,
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          unitValue: product.unitValue,
          amount: 1,
        },
      ];
    });
  }

  function increaseItem(id: number) {
    updateCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item,
      ),
    );
  }

  function decreaseItem(id: number) {
    updateCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item,
        )
        .filter((item) => item.amount > 0),
    );
  }

  function removeItem(id: number) {
    updateCart((current) => current.filter((item) => item.id !== id));
  }

  async function applyCoupon() {
    try {
      if (cupomLoading) return;

      setCupomError("");
      setCupomLoading(true);

      const response = await api.get<Cupom>("/cupom", {
        params: {
          code: cupomSearch,
        },
      });

      setCupom(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setCupomError(
          error.response?.data?.message ?? "Não foi possível aplicar o cupom.",
        );

        return;
      }

      setCupomError("Não foi possível aplicar o cupom.");
    } finally {
      setCupomLoading(false);
    }
  }

  function changeAmount(id: number, amount: number) {
    const normalizedAmount = Math.min(Math.max(Math.floor(amount), 1), 100);

    updateCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, amount: normalizedAmount } : item,
      ),
    );
  }

  async function checkout() {
    try {
      // if (cupomLoading) return;

      setCheckoutLoading(true);
      setCheckoutError("");
      const payload = {
        products: cartItems.map((item) => ({
          id: item.id,
          amount: item.amount,
        })),
      };

      const response = await api.post("/purchase", payload);

      if (response.status === 201) {
        fetchProducts(1, debouncedSearch, true);
        setCupom(undefined);
        updateCart([]);
        setCartOpen(false);
        toast.success("Compra realizada com sucesso!");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setCheckoutError(
          error.response?.data?.message ?? "Não foi possível aplicar o cupom.",
        );

        return;
      }

      setCheckoutError("Não foi possível aplicar o cupom.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    if (!storedCart) return;

    try {
      setCartItems(JSON.parse(storedCart));
    } catch {
      localStorage.removeItem("cart");
    }
  }, []);

  useEffect(() => {
    fetchProducts(page, debouncedSearch, page === 1);
  }, [page, debouncedSearch]);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !isLoading && page < totalPages) {
          setPage((current) => current + 1);
        }
      },
      {
        rootMargin: "200px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isLoading, page, totalPages]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar
        search={
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar produtos..."
          />
        }
      >
        <Button onClick={() => setCartOpen(true)}>
          <FaShoppingCart />
          Carrinho
          <span className="rounded-full bg-white px-2 py-0.5 text-xs text-gray-900">
            {cartItems.length ?? 0}
          </span>
        </Button>
      </TopBar>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <span className="text-sm font-medium text-gray-500">CATÁLOGO</span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="mt-2 text-gray-500">
            Confira os produtos disponíveis em nosso estoque.
          </p>
        </div>
        {products.length === 0 ? (
          !isLoading && <EmptyProducts />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const itemExists = cartItems.some(
                (item) => item.id === product.id,
              );
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  included={itemExists}
                  onAdd={addToCart}
                />
              );
            })}
          </div>
        )}
        {isLoading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}
        <div ref={loadMoreRef} className="h-10" />
      </main>
      <Drawer open={cartOpen} onClose={() => setCartOpen(false)} variant="end">
        <Cart
          onChangeAmount={changeAmount}
          cupom={cupom}
          items={cartItems}
          setCupom={setCupom}
          onRemove={removeItem}
          onCheckout={checkout}
          cupomError={cupomError}
          onIncrease={increaseItem}
          cupomSearch={cupomSearch}
          onDecrease={decreaseItem}
          onApplyCoupon={applyCoupon}
          cupomLoading={cupomLoading}
          onCouponChange={setCupomSearch}
          checkoutLoading={checkoutLoading}
          checkoutError={checkoutError}
        />
      </Drawer>
    </div>
  );
}
