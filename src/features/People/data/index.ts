import { BsPersonVcardFill } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";

import { MdEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import {
  FaIdCard,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaAddressBook,
} from "react-icons/fa";
import { IPostPerson } from "../interfaces";
import {
  IFilterByComboBox,
  IGenericContextMenuItem,
  IGenericField,
  IHeaderData,
} from "../../../interfaces";

//------------------------------------------------

// Generic Filter Data Interface

// people Filter By Values
export interface IFilterByPeople {
  name:
    | "None"
    | "PersonID"
    | "NationalNo"
    | "FirstName"
    | "SecondName"
    | "ThirdName"
    | "LastName"
    | "Nationality"
    | "Gender"
    | "Phone"
    | "Email";
  displayName:
    | "None"
    | "Person ID"
    | "National No."
    | "First Name"
    | "Second Name"
    | "Third Name"
    | "Last Name"
    | "Nationality"
    | "Gender"
    | "Phone"
    | "Email";
}

export interface ILockupPerson {
  name: "None" | "PersonID" | "NationalNo";
  displayName: "None" | "Person ID" | "National No.";
}

export const FilterByPersonData: Array<IFilterByComboBox> = [
  {
    type: "None",
    value: {
      name: "None",
      displayName: "None",
    },
  },
  {
    type: "number",
    value: {
      name: "PersonId",
      displayName: "Person Id",
    },
  },
  {
    type: "number",
    value: {
      name: "NationalNo",
      displayName: "National No.",
    },
  },
  {
    type: "string",
    value: {
      name: "FirstName",
      displayName: "First Name",
    },
  },
  {
    type: "string",
    value: {
      name: "SecondName",
      displayName: "Second Name",
    },
  },
  {
    type: "string",
    value: {
      name: "ThirdName",
      displayName: "Third Name",
    },
  },
  {
    type: "string",
    value: {
      name: "LastName",
      displayName: "Last Name",
    },
  },
  {
    type: "string",
    value: {
      name: "Nationality",
      displayName: "Nationality",
    },
  },
  {
    type: "category",
    value: {
      name: "Gender",
      displayName: "Gender",
    },
  },
  {
    type: "string",
    value: {
      name: "Phone",
      displayName: "Phone",
    },
  },
  {
    type: "string",
    value: {
      name: "Email",
      displayName: "Email",
    },
  },
];

export const FindPersonData: Array<IFilterByComboBox> = [
  {
    type: "None",
    value: {
      name: "None",
      displayName: "None",
    },
  },
  {
    type: "number",
    value: {
      name: "PersonId",
      displayName: "Person Id",
    },
  },
  {
    type: "number",
    value: {
      name: "NationalNo",
      displayName: "National No.",
    },
  },
];

//------------------------------------------------

// People Header Table
export const PeopleTableHeaderData: Array<IHeaderData> = [
  { displayName: "Person ID", name: "PersonId" },
  { displayName: "National No.", name: "NationalNo" },
  { displayName: "First Name", name: "FirstName" },
  { displayName: "Second Name", name: "SecondName" },
  { displayName: "Third Name", name: "ThirdName" },
  { displayName: "Last Name", name: "LastName" },
  { displayName: "Gender", name: "Gender" },
  { displayName: "Phone", name: "Phone" },
  { displayName: "Email", name: "Email" },
  { displayName: "Address", name: "Address" },
  { displayName: "Date Of Birth", name: "DateOfBirth" },
  { displayName: "Nationality", name: "Nationality" },
];

//------------------------------------------------

// people context menu

export type TPeopleOperation =
  | "Add Person"
  | "Show Details"
  | "Edit Person"
  | "Delete Person";

export const peopleContextMenuItemData: Array<
  IGenericContextMenuItem<TPeopleOperation>
> = [
  {
    operation: "Show Details",
    Icon: BsPersonVcardFill,
  },
  {
    operation: "Add Person",
    Icon: IoMdPersonAdd,
  },
  {
    operation: "Edit Person",

    Icon: MdEdit,
  },
  {
    operation: "Delete Person",
    Icon: TiDelete,
  },
];
//------------------------------------------------

// generic input filed type

export const PersonFieldsData: IGenericField<IPostPerson>[] = [
  {
    name: "nationalNo",
    type: "text",
    displayName: "National Number",
    placeholder: "National Number",
    isMenu: false,
    Icon: FaIdCard,
  },
  {
    name: "firstName",
    type: "text",
    displayName: "First Name",
    placeholder: "First Name",
    isMenu: false,

    Icon: FaUser,
  },
  {
    name: "secondName",
    type: "text",
    displayName: "Second Name",
    placeholder: "Second Name",
    isMenu: false,

    Icon: FaUser,
  },
  {
    name: "thirdName",
    type: "text",
    displayName: "Third Name",
    placeholder: "Third Name",
    isMenu: false,

    Icon: FaUser,
  },
  {
    name: "lastName",
    type: "text",
    displayName: "Last Name",
    placeholder: "Enter Last Name",
    isMenu: false,

    Icon: FaUser,
  },
  {
    name: "dateOfBirth",
    type: "date",
    displayName: "Date of Birth",
    isMenu: false,
    placeholder: "mm/dd/yyyy",
    Icon: FaCalendarAlt,
  },

  {
    name: "address",
    type: "text",
    displayName: "Address",
    placeholder: "Address",
    isMenu: false,

    Icon: FaAddressBook,
  },
  {
    name: "phone",
    type: "text",
    displayName: "Phone",
    placeholder: "Enter Phone Number",
    isMenu: false,

    Icon: FaPhone,
  },
  {
    name: "email",
    type: "text",
    displayName: "Email",
    placeholder: "Enter Email Address",
    isMenu: false,

    Icon: FaEnvelope,
  },
];
