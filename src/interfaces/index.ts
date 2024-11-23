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
  type: "text" | "password" | "category" | "number";
  displayName: string;
  placeholder: string;
  Icon?: ElementType;
}

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
}

export enum enumFormMode {
  Add,
  Edit,
}
