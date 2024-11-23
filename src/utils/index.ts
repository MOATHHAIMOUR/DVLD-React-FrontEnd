import { IQuery } from "../interfaces";

export function isNumber(value: string): boolean {
  const regex = /^[+-]?\d+(\.\d+)?$/;
  return regex.test(value);
}

export function BuildQuery(query: IQuery): string {
  const arrQuery: Array<string> = [];

  if (query?.Filter?.FilterBy) {
    arrQuery.push(`${query.Filter?.FilterBy}=${query.Filter?.FilterValue}`);
  }

  if (query?.PageNumber) {
    arrQuery.push(`PageNumber=${query.PageNumber}`);
  }

  if (query?.sortBy != "" && query?.sort !== "NONE") {
    arrQuery.push(`SortBy=${query?.sortBy}&SortDirection=${query?.sort}`);
  }

  return arrQuery.length > 0 ? `?${arrQuery.join("&")}` : "";
}

export function BuildSimpleQuery(key: string, value: string | number): string {
  return `?${key}=${value}`;
}

export const getQueryData = (location: Location) => {
  return new URLSearchParams(location.search);
};
