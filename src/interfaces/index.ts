import { ElementType } from "react";

export interface INavbar {
  name: string;
  path: string;
  Icon: ElementType;
  children?: Array<INavbar>;
}

export interface IGenericField<T> {
  isMenu: boolean;
  menuData?: Array<{
    displayName: string;
    value: string;
  }>;
  name: keyof T;
  type: "text" | "password" | "category" | "number" | "date";
  displayName: string;
  placeholder: string;
  Icon?: ElementType;
}

export interface IFilter {
  FilterBy: string;
  FilterValue: string | number | null;
}

export interface IQuery {
  PageSize?: number;
  PageNumber?: number;
  AdvanceFilters?: Array<IFilter>;
  Filter?: IFilter;
  sort?: "ASC" | "DESC" | "NONE";
  sortBy?: string;
}

export interface IFilterByComboBox {
  value: {
    displayName: string;
    name: string;
  };
  type: "None" | "category" | "string" | "Date" | "number";
}

export interface IHeaderData {
  name: string;
  displayName: string;
}

export interface IGenericContextMenuItem<T> {
  operation: T;
  Icon: ElementType;
  isSubMenu?: boolean;
  children?: Array<IGenericContextMenuItem<T>>;
  isDisabled?: boolean;
  disableMessage?: string;
}

export interface ICountry {
  id: number;
  name: string;
}
