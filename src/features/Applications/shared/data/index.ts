import { BiEdit } from "react-icons/bi";
import {
  IGenericContextMenuItem,
  IGenericField,
  IHeaderData,
} from "../../../../interfaces";
import { TApplicationTypeOperationsContextMenu } from "../types";
import { IApplicationType } from "../interfaces";

export const ApplicationContextMenuOperations: Array<
  IGenericContextMenuItem<TApplicationTypeOperationsContextMenu>
> = [
  {
    operation: "Edit Application",
    Icon: BiEdit,
  },
];

export const applicationTypesTableHeader: Array<IHeaderData> = [
  {
    name: "applicationTypeID",
    displayName: "Application Type ID",
  },
  {
    name: "applicationTypeTitle",
    displayName: "Application Type Title",
  },
  {
    name: "applicationFees",
    displayName: "Application Fees",
  },
];

export const applicationTypesFields: Array<IGenericField<IApplicationType>> = [
  {
    displayName: "Application Type Title",
    name: "applicationTypeTitle",
    isMenu: false,
    placeholder: "enter Application Type Title",
    type: "text",
  },
  {
    displayName: "Application Fees",
    name: "applicationFees",
    isMenu: false,
    placeholder: "enter Application Fees",
    type: "number",
  },
];
