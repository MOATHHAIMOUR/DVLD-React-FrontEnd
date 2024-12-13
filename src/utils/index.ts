import { IQuery } from "../interfaces";

export function isNumber(value: string): boolean {
  const regex = /^[+-]?\d+(\.\d+)?$/;
  return regex.test(value);
}

export function BuildQuery(query: IQuery): string {
  const arrQuery: Array<string> = [];

  if (query?.AdvanceFilters?.length ?? 0 > 0) {
    query?.AdvanceFilters?.forEach(
      (filter: { FilterBy: string; FilterValue: string }) => {
        arrQuery.push(`${filter.FilterBy}=${filter.FilterValue}`);
      }
    );
  }

  if (query.Filter) {
    arrQuery.push(`${query.Filter.FilterBy}=${query.Filter.FilterValue}`);
  }

  if (query?.PageNumber) {
    arrQuery.push(`PageNumber=${query.PageNumber}`);
  }

  if (
    query?.sortBy &&
    query?.sortBy != "" &&
    query?.sort &&
    query?.sort !== "NONE"
  ) {
    arrQuery.push(`OrderBy=${query?.sortBy}&OrderDirection=${query?.sort}`);
  }

  return arrQuery.length > 0 ? `?${arrQuery.join("&")}` : "";
}

export function BuildSimpleQuery(key: string, value: string | number): string {
  return `?${key}=${value}`;
}

export const getQueryData = (location: Location) => {
  return new URLSearchParams(location.search);
};

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
