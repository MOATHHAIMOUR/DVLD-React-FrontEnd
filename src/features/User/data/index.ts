import {
  IFilterByComboBox,
  IGenericContextMenuItem,
  IGenericField,
  IHeaderData,
} from "../../../interfaces";
import { TUserOperationsContextMenu } from "../types";
import { BiSolidUserDetail } from "react-icons/bi";
import { CgUserAdd } from "react-icons/cg";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { IFormUser } from "../interfaces";
import { MdOutlinePassword } from "react-icons/md";

export const FilterByUser: Array<IFilterByComboBox> = [
  {
    value: {
      name: "userId",
      displayName: "User Id",
    },
    type: "string",
  },
  {
    value: {
      name: "personId",
      displayName: "Person Id",
    },
    type: "string",
  },
  {
    value: {
      name: "username",
      displayName: "Username",
    },
    type: "string",
  },
  {
    value: {
      name: "IsActive",
      displayName: "Is Active",
    },
    type: "category",
  },
];

export const usersTableHeader: Array<IHeaderData> = [
  {
    displayName: "User Id",
    name: "UserId",
  },
  {
    displayName: "Person Id",
    name: "PersonId",
  },
  {
    displayName: "User Name",
    name: "Username",
  },
  {
    displayName: "Is Active",
    name: "IsActive",
  },
];

export const userContextMenuItemData: Array<
  IGenericContextMenuItem<TUserOperationsContextMenu>
> = [
  {
    operation: "Show Detail",
    Icon: BiSolidUserDetail,
  },
  {
    operation: "Add User",
    Icon: CgUserAdd,
  },
  {
    operation: "Edit User",
    Icon: FaUserEdit,
  },
  {
    operation: "Delete User",
    Icon: TiDelete,
  },
];

export const userFields: Array<IGenericField<IFormUser>> = [
  {
    displayName: "Username",
    Icon: FaUserAlt,
    isMenu: false,
    name: "username",
    type: "text",
    placeholder: "Enter your username",
  },
  {
    displayName: "password",
    Icon: MdOutlinePassword,
    isMenu: false,
    name: "password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    displayName: "confirm password",
    Icon: MdOutlinePassword,
    isMenu: false,
    name: "confirmPassword",
    type: "password",
    placeholder: "Reenter your password",
  },
  {
    displayName: "is Active",
    isMenu: true,
    menuData: [
      {
        displayName: "Yes",
        value: "true",
      },
      {
        displayName: "No",
        value: "false",
      },
    ],
    name: "isActive",
    type: "category",
    placeholder: "Enter your username",
  },
];

export const FindUserData: Array<IFilterByComboBox> = [
  {
    type: "number",
    value: {
      displayName: "User Id",
      name: "userId",
    },
  },
  {
    type: "string",
    value: {
      displayName: "Username",
      name: "Username",
    },
  },
];
