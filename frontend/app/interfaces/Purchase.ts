interface PurchaseBody {
  cupomId?: number;
  products: {
    id: number;
    amount: number;
  }[];
}
