interface Cupom {
  id: number;
  code: string;
  type: string;
  value: number;
  amountOfUsages: number;
  expiredAt: string;
}