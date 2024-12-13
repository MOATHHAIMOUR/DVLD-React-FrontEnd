import {
  IFilterByComboBox,
  IGenericContextMenuItem,
  IHeaderData,
} from "../../../../interfaces";
import { TLocalDrivingContextMenu } from "../types";
import { BiSolidUserDetail } from "react-icons/bi";

export const localDrivingApplicationHeaderData: Array<IHeaderData> = [
  {
    name: "LocalDrivingLicenseApplicationId",
    displayName: "Local Driving License Application Id",
  },
  {
    name: "ClassName",
    displayName: "Class Name",
  },
  {
    name: "nationalNo",
    displayName: "national No",
  },
  {
    name: "FullName",
    displayName: "Full Name",
  },
  {
    name: "ApplicationDate",
    displayName: "Application Date",
  },
  {
    name: "PassedTests",
    displayName: "Passed Tests",
  },
  {
    name: "ApplicationStatus",
    displayName: "Application Status",
  },
];

export const localDrivingApplicationContextMenuData: Array<
  IGenericContextMenuItem<TLocalDrivingContextMenu>
> = [
  {
    operation: "Show Application Detail",
    Icon: BiSolidUserDetail,
  },
  {
    operation: "Schedule Test",
    Icon: BiSolidUserDetail,
    isSubMenu: true,
    children: [
      {
        operation: "Vision Test",
        Icon: BiSolidUserDetail,
        isDisabled: false,
      },
      {
        operation: "Written Test",
        isDisabled: true,
        Icon: BiSolidUserDetail,
      },
      {
        operation: "Practical Test",
        isDisabled: true,
        Icon: BiSolidUserDetail,
      },
    ],
  },
  {
    operation: "Cancel Application",
    Icon: BiSolidUserDetail,
  },
  {
    operation: "Delete Application",
    Icon: BiSolidUserDetail,
  },
];

export const filterByLocalDrivingLicenseData: Array<IFilterByComboBox> = [
  {
    type: "None",
    value: {
      name: "none",
      displayName: "None",
    },
  },
  {
    type: "number",
    value: {
      name: "LocalDrivingLicenseApplicationId",
      displayName: "Local Driving LicenseApplication Id",
    },
  },
  {
    type: "string",
    value: {
      name: "ClassName",
      displayName: "Class Name",
    },
  },
  {
    type: "number",
    value: {
      name: "NationalNo",
      displayName: "National No",
    },
  },
  {
    type: "string",
    value: {
      name: "FullName",
      displayName: "Full Name",
    },
  },
  {
    type: "category",
    value: {
      name: "ApplicationStatus",
      displayName: "Application Status",
    },
  },
];

export const FindLocalDrivingLicenseData: Array<IFilterByComboBox> = [
  {
    type: "string",
    value: {
      displayName: "National No",
      name: "NationalNo",
    },
  },
];

export const LocalDrivingLicenseTypesData: Array<{
  value: number;
  name: string;
}> = [
  { value: 1, name: "Class 1 - Small Motorcycle" },
  { value: 2, name: "Class 2 - Heavy Motorcycle License" },
  { value: 3, name: "Class 3 - Ordinary driving license" },
  { value: 4, name: "Class 4 - Commercial" },
  { value: 5, name: "Class 5 - Agricultural" },
  { value: 6, name: "Class 6 - Small and medium bus" },
  { value: 7, name: "Class 7 - Truck and heavy vehicle" },
];
