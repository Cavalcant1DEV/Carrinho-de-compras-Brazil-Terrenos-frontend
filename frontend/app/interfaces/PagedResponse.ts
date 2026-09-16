interface PagedResponse<T> {
  data: Product[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}