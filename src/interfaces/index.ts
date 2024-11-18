export interface IFilter {
  FilterBy: string;
  FilterValue: string;
}
export interface IQuery {
  PageSize?: number;
  PageNumber?: number;
  AdvanceFilters?: string;
  Filter?: IFilter;
  sort?: "ASC" | "DESC" | "NONE";
  sortBy?: string;
}
