import clsx, { ClassValue } from "clsx";
import { IQuery } from "../interfaces";
import { twMerge } from "tailwind-merge";

export function tailwindCMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isNumber(value: string): boolean {
  const regex = /^[+-]?\d+(\.\d+)?$/;
  return regex.test(value);
}

export function BuildQuery(query: IQuery): string {
  const arrQuery: Array<string> = [];

  if (query?.AdvanceFilters?.length ?? 0 > 0) {
    query?.AdvanceFilters?.forEach(
      (filter: { FilterBy: string; FilterValue: string | number | null }) => {
        if (filter.FilterValue != null) {
          arrQuery.push(`${filter.FilterBy}=${filter.FilterValue}`);
        }
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

export function BuildSimpleQuery(
  key: string,
  value: string | number | null
): string {
  if (value == null) return "";

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

// Utility function for date formatting
export const formatDate2 = (date: Date, language: string) => {
  const formatter = new Intl.DateTimeFormat(language, {
    weekday: "short", // Short weekday name
    year: "numeric", // Full year
    month: "long", // Full month name
    day: "2-digit", // Day with leading zero
  });

  return formatter.format(date);
};

export const toArabicNumbers = (num: number | string): string => {
  const westernNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

  return num
    .toString()
    .split("")
    .map((char) =>
      westernNumbers.includes(char)
        ? arabicNumbers[westernNumbers.indexOf(char)]
        : char
    )
    .join("");
};
