import {
  MdAddCard,
  MdDriveEta,
  MdEditNote,
  MdVisibility,
} from "react-icons/md";
import {
  IFilterByComboBox,
  IGenericContextMenuItem,
  IHeaderData,
} from "../../../../interfaces";
import { TLocalDrivingContextMenu } from "../types";
import { BiCalendarCheck, BiXCircle } from "react-icons/bi";
import { EnumApplicationStatus } from "../Enums";
import { FaAddressCard } from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";

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

export function GetLocalDrivingApplicationContextMenuData(
  numberOfPassedTests: number,
  applicationStatus: EnumApplicationStatus
): Array<IGenericContextMenuItem<TLocalDrivingContextMenu>> {
  console.log("numberOfPassedTests: " + numberOfPassedTests);
  switch (numberOfPassedTests) {
    case 0:
      return [
        {
          operation: "Show Application Details",
          Icon: AiOutlineFileText, // Eye icon for viewing details
        },

        GenerateScheduleData(applicationStatus, 0),

        {
          operation: "Issue License (First Time)",
          isDisabled: true,
          Icon: MdAddCard, // Calendar check for first license
        },
        {
          operation: "Show License",
          isDisabled: true,
          Icon: FaAddressCard, // Eye icon for viewing license
        },
        {
          operation: "Cancel Application",
          isDisabled: applicationStatus === EnumApplicationStatus.Cancelled,
          Icon: BiXCircle, // Cross-circle for cancellation
        },
      ];

    case 1:
      return [
        {
          operation: "Show Application Details",
          Icon: AiOutlineFileText, // Eye icon for viewing details
        },
        GenerateScheduleData(applicationStatus, 1),
        {
          operation: "Issue License (First Time)",
          isDisabled: true,
          Icon: MdAddCard, // Calendar check for first license
        },
        {
          operation: "Show License",
          isDisabled: true,
          Icon: FaAddressCard, // Eye icon for viewing license
        },
        {
          operation: "Cancel Application",
          isDisabled: applicationStatus === EnumApplicationStatus.Cancelled,
          Icon: BiXCircle, // Cross-circle for cancellation
        },
      ];

    case 2:
      return [
        {
          operation: "Show Application Details",
          Icon: AiOutlineFileText, // Eye icon for viewing details
        },

        GenerateScheduleData(applicationStatus, 2),
        {
          operation: "Issue License (First Time)",
          isDisabled: true,
          Icon: MdAddCard, // Calendar check for first license
        },
        {
          operation: "Show License",
          isDisabled: true,
          Icon: FaAddressCard, // Eye icon for viewing license
        },
        {
          operation: "Cancel Application",
          isDisabled: applicationStatus === EnumApplicationStatus.Cancelled,
          Icon: BiXCircle, // Cross-circle for cancellation
        },
      ];

    case 3:
      return [
        {
          operation: "Show Application Details",
          Icon: AiOutlineFileText, // Eye icon for viewing details
        },

        GenerateScheduleData(applicationStatus, 3),
        {
          operation: "Issue License (First Time)",
          isDisabled:
            applicationStatus === EnumApplicationStatus.Cancelled ||
            applicationStatus === EnumApplicationStatus.Completed,
          Icon: MdAddCard, // Calendar check for first license
        },
        {
          operation: "Show License",
          isDisabled:
            applicationStatus === EnumApplicationStatus.Cancelled ||
            applicationStatus === EnumApplicationStatus.New,
          Icon: FaAddressCard, // Eye icon for viewing license
        },
        {
          operation: "Cancel Application",
          isDisabled:
            applicationStatus === EnumApplicationStatus.Cancelled ||
            applicationStatus === EnumApplicationStatus.Completed,
          Icon: BiXCircle, // Cross-circle for cancellation
        },
      ];
  }
  return [];
}

function GenerateScheduleData(
  applicationStatus: EnumApplicationStatus,
  passedTests: number
): IGenericContextMenuItem<TLocalDrivingContextMenu> {
  console.log("passedTests: " + passedTests);
  return {
    operation: "Schedule Test",
    Icon: BiCalendarCheck, // Calendar check for scheduling tests
    isSubMenu: true,
    isDisabled:
      applicationStatus === EnumApplicationStatus.Cancelled ||
      applicationStatus === EnumApplicationStatus.Completed ||
      passedTests === 3,
    children: [
      {
        operation: "Vision Test",
        Icon: MdVisibility, // Test tube icon for vision testing
        isDisabled: passedTests !== 0,
      },
      {
        operation: "Written Test",
        Icon: MdEditNote, // Notebook for written test
        isDisabled: passedTests !== 1,
      },
      {
        operation: "Practical Test",
        Icon: MdDriveEta, // Car icon for practical driving test
        isDisabled: passedTests !== 2,
      },
    ],
  };
}

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
    type: "string",
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
