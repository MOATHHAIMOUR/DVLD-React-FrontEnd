export interface IGenericApiResponse<T> {
  data: T;
  meta: IMeatPagination;
  message: string;
  errors: string[]; // Changed from `string` to `string[]`
  statusCode: number;
}

interface IMeatPagination {
  totalPages: number;
  count: number;
}
