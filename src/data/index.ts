import { ElementType } from "react";
import { BsPersonVcardFill } from "react-icons/bs";
import { IoIosPeople, IoMdPersonAdd } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdDelete, MdEdit, MdModeEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import {
  FaIdCard,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaAddressBook,
  FaSearch,
} from "react-icons/fa";
import { IPerson } from "../features/People/interfaces";
import { GrUserManager } from "react-icons/gr";

// Nav par Data
export interface INavbar {
  name: string;
  path: string;
  Icon: ElementType;
  children?: Array<INavbar>;
}
export const NavData: Array<INavbar> = [
  {
    name: "Manage People",
    Icon: IoIosPeople,
    path: "/people",
    children: [
      {
        name: "People Management",
        path: "/",
        Icon: GrUserManager,
      },
      {
        name: "Find Person",
        path: "/find-person",
        Icon: FaSearch,
      },
      {
        name: "Add Person",
        path: "/add-person",
        Icon: IoPersonAddOutline,
      },
      {
        name: "Edit Person",
        path: "/edit-person",
        Icon: MdModeEdit,
      },
      {
        name: "Delete Person",
        path: "/delete-person",
        Icon: MdDelete,
      },
    ],
  },
];

//------------------------------------------------

// Generic Filter Data Interface
export interface IFilterBy<T> {
  value: T;
  type: "None" | "category" | "string" | "Date" | "number";
}

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

export const FilterByData: Array<IFilterBy<IFilterByPeople>> = [
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
      name: "PersonID",
      displayName: "Person ID",
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

export const FindPersonData: Array<IFilterBy<ILockupPerson>> = [
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
      name: "PersonID",
      displayName: "Person ID",
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

export interface IHeaderData {
  name: string;
  displayName: string;
}
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
export interface IContextMenuItem<T> {
  operation: T;
  Icon: ElementType;
}

export type TPeopleOperation =
  | "Add Person"
  | "Show Details"
  | "Edit Person"
  | "Delete Person";

export const peopleContextMenuItemData: Array<
  IContextMenuItem<TPeopleOperation>
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
interface IField<T> {
  isMenu: boolean;
  name: keyof T;
  type: string;
  displayName: string;
  placeholder: string;
  Icon: ElementType;
}

export const PersonFieldsData: IField<IPerson>[] = [
  {
    name: "nationalNo",
    type: "text",
    displayName: "National Number",
    placeholder: "Enter National Number",
    isMenu: false,

    Icon: FaIdCard,
  },
  {
    name: "firstName",
    type: "text",
    displayName: "First Name",
    placeholder: "Enter First Name",
    isMenu: false,

    Icon: FaUser,
  },
  {
    name: "secondName",
    type: "text",
    displayName: "Second Name",
    placeholder: "Enter Second Name",
    isMenu: false,

    Icon: FaUser,
  },
  {
    name: "thirdName",
    type: "text",
    displayName: "Third Name",
    placeholder: "Enter Third Name",
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
    placeholder: "Enter Address",
    isMenu: false,

    Icon: FaAddressBook,
  },
  {
    name: "phone",
    type: "tel",
    displayName: "Phone",
    placeholder: "Enter Phone Number",
    isMenu: false,

    Icon: FaPhone,
  },
  {
    name: "email",
    type: "email",
    displayName: "Email",
    placeholder: "Enter Email Address",
    isMenu: false,

    Icon: FaEnvelope,
  },
];

// enum for Save person mode
export enum enumFormMode {
  Add,
  Edit,
}

//Gender Data
export const GenderData = [
  {
    name: "Male",
  },
  {
    name: "Female",
  },
];
