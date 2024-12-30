
import { TTestAppointmentContextMenu } from "../types";
import { MdCancel, MdEdit } from "react-icons/md";
import { BiClipboard } from "react-icons/bi";
import { IFilterByComboBox, IGenericContextMenuItem, IHeaderData } from "../../../../interfaces";

export const testAppointmentHeaderTableData: Array<IHeaderData> = [
  {
    displayName: "Test Appointment ID",
    name: "testAppointmentId",
  },
  {
    displayName: "Appointment Date",
    name: "appointmentDate",
  },
  {
    displayName: "Paid Fees",
    name: "paidFees",
  },
  {
    displayName: "Is Locked",
    name: "isLocked",
  },
  {
    displayName: "Test Result",
    name: "testResult",
  },
];

export const testAppointmentContextMenuData: Array<
  IGenericContextMenuItem<TTestAppointmentContextMenu>
> = [
  {
    operation: "Take Test",
    Icon: BiClipboard,
    disableMessage: "can't take test when it's locked",
  },
  {
    operation: "Edit Test",
    Icon: MdEdit,
    disableMessage: "can't edit test when it's locked",
  },
  {
    operation: "Cancel Test",
    Icon: MdCancel,
    disableMessage: "can't cancel test when it's locked",
  },
];

export const FilterByTestAppointment: Array<IFilterByComboBox> = [
  {
    type: "string",
    value: {
      displayName: "Local Driving License Application Id",
      name: "LocalDrivingLicenseApplicationId",
    },
  },
  {
    type: "string",
    value: {
      displayName: "First Name",
      name: "FirstName",
    },
  },
  {
    type: "string",
    value: {
      displayName: "Last Name",
      name: "LastName",
    },
  },
  {
    type: "string",
    value: {
      displayName: "Test Type Title",
      name: "TestTypeTitle",
    },
  },
  {
    type: "category",
    value: {
      displayName: "Test Result",
      name: "TestResult",
    },
  },
  {
    type: "category",
    value: {
      displayName: "Is Locked",
      name: "IsLocked",
    },
  },
  {
    type: "string",
    value: {
      displayName: "Notes",
      name: "Notes",
    },
  },
  {
    type: "string",
    value: {
      displayName: "Created By User",
      name: "CreatedByUser",
    },
  },
];
