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
      displayName: "People.filter_options.none", // Translation key for "None"
    },
  },
  {
    type: "number",
    value: {
      name: "PersonId",
      displayName: "People.filter_options.person_id", // Translation key for "Person Id"
    },
  },
  {
    type: "number",
    value: {
      name: "NationalNo",
      displayName: "People.filter_options.national_no", // Translation key for "National No."
    },
  },
  {
    type: "string",
    value: {
      name: "FirstName",
      displayName: "People.filter_options.first_name", // Translation key for "First Name"
    },
  },
  {
    type: "string",
    value: {
      name: "SecondName",
      displayName: "People.filter_options.second_name", // Translation key for "Second Name"
    },
  },
  {
    type: "string",
    value: {
      name: "ThirdName",
      displayName: "People.filter_options.third_name", // Translation key for "Third Name"
    },
  },
  {
    type: "string",
    value: {
      name: "LastName",
      displayName: "People.filter_options.last_name", // Translation key for "Last Name"
    },
  },
  {
    type: "string",
    value: {
      name: "Nationality",
      displayName: "People.filter_options.nationality", // Translation key for "Nationality"
    },
  },
  {
    type: "category",
    value: {
      name: "Gender",
      displayName: "People.filter_options.gender", // Translation key for "Gender"
    },
  },
  {
    type: "number",
    value: {
      name: "Phone",
      displayName: "People.filter_options.phone", // Translation key for "Phone"
    },
  },
  {
    type: "string",
    value: {
      name: "Email",
      displayName: "People.filter_options.email", // Translation key for "Email"
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

export const PeopleTableHeaderData: Array<IHeaderData> = [
  { displayName: "People.tb_data.person_id", name: "PersonId" },
  { displayName: "People.tb_data.national_no", name: "NationalNo" },
  { displayName: "People.tb_data.first_name", name: "FirstName" },
  { displayName: "People.tb_data.second_name", name: "SecondName" },
  { displayName: "People.tb_data.third_name", name: "ThirdName" },
  { displayName: "People.tb_data.last_name", name: "LastName" },
  { displayName: "People.tb_data.gender", name: "Gender" },
  { displayName: "People.tb_data.phone", name: "Phone" },
  { displayName: "People.tb_data.email", name: "Email" },
  { displayName: "People.tb_data.nationality", name: "Nationality" },
  { displayName: "People.tb_data.DateOfBirth", name: "DateOfBirth" },
  { displayName: "People.tb_data.Address", name: "Address" },
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
    name: "People.Operations.ShowDetails",
    Icon: BsPersonVcardFill,
  },
  {
    operation: "Add Person",
    name: "People.Operations.AddPerson",
    Icon: IoMdPersonAdd,
  },
  {
    operation: "Edit Person",
    name: "People.Operations.EditPerson",

    Icon: MdEdit,
  },
  {
    operation: "Delete Person",
    name: "People.Operations.DeletePerson",
    Icon: TiDelete,
  },
];
//------------------------------------------------

// generic input filed type

export const PersonFieldsData: IGenericField<IPostPerson>[] = [
  {
    name: "nationalNo",
    type: "text",
    displayName: "People.tb_data.national_no",
    placeholder: "People.placeHolders.national_no",
    isMenu: false,
    Icon: FaIdCard,
  },
  {
    name: "firstName",
    type: "text",
    displayName: "People.tb_data.first_name",
    placeholder: "People.placeHolders.first_name",
    isMenu: false,
    Icon: FaUser,
  },
  {
    name: "secondName",
    type: "text",
    displayName: "People.tb_data.second_name",
    placeholder: "People.placeHolders.second_name",
    isMenu: false,
    Icon: FaUser,
  },
  {
    name: "thirdName",
    type: "text",
    displayName: "People.tb_data.third_name",
    placeholder: "People.placeHolders.third_name",
    isMenu: false,
    Icon: FaUser,
  },
  {
    name: "lastName",
    type: "text",
    displayName: "People.tb_data.last_name",
    placeholder: "People.placeHolders.last_name",
    isMenu: false,
    Icon: FaUser,
  },

  {
    name: "address",
    type: "text",
    displayName: "People.tb_data.Address",
    placeholder: "People.placeHolders.Address",
    isMenu: false,
    Icon: FaAddressBook,
  },
  {
    name: "phone",
    type: "number",
    displayName: "People.tb_data.phone",
    placeholder: "People.placeHolders.phone",
    isMenu: false,
    Icon: FaPhone,
  },
  {
    name: "email",
    type: "text",
    displayName: "People.tb_data.email",
    placeholder: "People.placeHolders.email",
    isMenu: false,
    Icon: FaEnvelope,
  },
];

export const countries = [
  { id: 1, name: "Countries.AF" },
  { id: 2, name: "Countries.AL" },
  { id: 3, name: "Countries.DZ" },
  { id: 4, name: "Countries.AD" },
  { id: 5, name: "Countries.AO" },
  { id: 6, name: "Countries.AG" },
  { id: 7, name: "Countries.AR" },
  { id: 8, name: "Countries.AM" },
  { id: 9, name: "Countries.AU" },
  { id: 10, name: "Countries.AT" },
  { id: 11, name: "Countries.AZ" },
  { id: 12, name: "Countries.BS" },
  { id: 13, name: "Countries.BH" },
  { id: 14, name: "Countries.BD" },
  { id: 15, name: "Countries.BB" },
  { id: 16, name: "Countries.BY" },
  { id: 17, name: "Countries.BE" },
  { id: 18, name: "Countries.BZ" },
  { id: 19, name: "Countries.BJ" },
  { id: 20, name: "Countries.BT" },
  { id: 21, name: "Countries.BO" },
  { id: 22, name: "Countries.BA" },
  { id: 23, name: "Countries.BW" },
  { id: 24, name: "Countries.BR" },
  { id: 25, name: "Countries.BN" },
  { id: 26, name: "Countries.BG" },
  { id: 27, name: "Countries.BF" },
  { id: 28, name: "Countries.BI" },
  { id: 29, name: "Countries.CV" },
  { id: 30, name: "Countries.KH" },
  { id: 31, name: "Countries.CM" },
  { id: 32, name: "Countries.CA" },
  { id: 33, name: "Countries.CF" },
  { id: 34, name: "Countries.TD" },
  { id: 35, name: "Countries.CL" },
  { id: 36, name: "Countries.CN" },
  { id: 37, name: "Countries.CO" },
  { id: 38, name: "Countries.KM" },
  { id: 39, name: "Countries.CD" },
  { id: 40, name: "Countries.CG" },
  { id: 41, name: "Countries.CR" },
  { id: 42, name: "Countries.HR" },
  { id: 43, name: "Countries.CU" },
  { id: 44, name: "Countries.CY" },
  { id: 45, name: "Countries.CZ" },
  { id: 46, name: "Countries.DK" },
  { id: 47, name: "Countries.DJ" },
  { id: 48, name: "Countries.DM" },
  { id: 49, name: "Countries.DO" },
  { id: 50, name: "Countries.EC" },
  { id: 51, name: "Countries.EG" },
  { id: 52, name: "Countries.SV" },
  { id: 53, name: "Countries.GQ" },
  { id: 54, name: "Countries.ER" },
  { id: 55, name: "Countries.EE" },
  { id: 56, name: "Countries.SZ" },
  { id: 57, name: "Countries.ET" },
  { id: 58, name: "Countries.FJ" },
  { id: 59, name: "Countries.FI" },
  { id: 60, name: "Countries.FR" },
  { id: 61, name: "Countries.GA" },
  { id: 62, name: "Countries.GM" },
  { id: 63, name: "Countries.GE" },
  { id: 64, name: "Countries.DE" },
  { id: 65, name: "Countries.GH" },
  { id: 66, name: "Countries.GR" },
  { id: 67, name: "Countries.GD" },
  { id: 68, name: "Countries.GT" },
  { id: 69, name: "Countries.GN" },
  { id: 70, name: "Countries.GW" },
  { id: 71, name: "Countries.GY" },
  { id: 72, name: "Countries.HT" },
  { id: 73, name: "Countries.HN" },
  { id: 74, name: "Countries.HU" },
  { id: 75, name: "Countries.IS" },
  { id: 76, name: "Countries.IN" },
  { id: 77, name: "Countries.ID" },
  { id: 78, name: "Countries.IR" },
  { id: 79, name: "Countries.IQ" },
  { id: 80, name: "Countries.IE" },
  { id: 81, name: "Countries.IT" },
  { id: 82, name: "Countries.JM" },
  { id: 83, name: "Countries.JP" },
  { id: 84, name: "Countries.JO" },
  { id: 85, name: "Countries.KZ" },
  { id: 86, name: "Countries.KE" },
  { id: 87, name: "Countries.KI" },
  { id: 88, name: "Countries.KP" },
  { id: 89, name: "Countries.KR" },
  { id: 90, name: "Countries.KW" },
  { id: 91, name: "Countries.KG" },
  { id: 92, name: "Countries.LA" },
  { id: 93, name: "Countries.LV" },
  { id: 94, name: "Countries.LB" },
  { id: 95, name: "Countries.LS" },
  { id: 96, name: "Countries.LR" },
  { id: 97, name: "Countries.LY" },
  { id: 98, name: "Countries.LI" },
  { id: 99, name: "Countries.LT" },
  { id: 100, name: "Countries.LU" },
  { id: 101, name: "Countries.MG" },
  { id: 102, name: "Countries.MW" },
  { id: 103, name: "Countries.MY" },
  { id: 104, name: "Countries.MV" },
  { id: 105, name: "Countries.ML" },
  { id: 106, name: "Countries.MT" },
  { id: 107, name: "Countries.MH" },
  { id: 108, name: "Countries.MR" },
  { id: 109, name: "Countries.MU" },
  { id: 110, name: "Countries.MX" },
  { id: 111, name: "Countries.FM" },
  { id: 112, name: "Countries.MD" },
  { id: 113, name: "Countries.MC" },
  { id: 114, name: "Countries.MN" },
  { id: 115, name: "Countries.ME" },
  { id: 116, name: "Countries.MA" },
  { id: 117, name: "Countries.MZ" },
  { id: 118, name: "Countries.MM" },
  { id: 119, name: "Countries.NA" },
  { id: 120, name: "Countries.NR" },
  { id: 121, name: "Countries.NP" },
  { id: 122, name: "Countries.NL" },
  { id: 123, name: "Countries.NZ" },
  { id: 124, name: "Countries.NI" },
  { id: 125, name: "Countries.NE" },
  { id: 126, name: "Countries.NG" },
  { id: 127, name: "Countries.NO" },
  { id: 128, name: "Countries.OM" },
  { id: 129, name: "Countries.PK" },
  { id: 130, name: "Countries.PW" },
  { id: 131, name: "Countries.PA" },
  { id: 132, name: "Countries.PG" },
  { id: 133, name: "Countries.PY" },
  { id: 134, name: "Countries.PE" },
  { id: 135, name: "Countries.PH" },
  { id: 136, name: "Countries.PL" },
  { id: 137, name: "Countries.PT" },
  { id: 138, name: "Countries.QA" },
  { id: 139, name: "Countries.RO" },
  { id: 140, name: "Countries.RU" },
  { id: 141, name: "Countries.RW" },
  { id: 142, name: "Countries.KN" },
  { id: 143, name: "Countries.LC" },
  { id: 144, name: "Countries.VC" },
  { id: 145, name: "Countries.WS" },
  { id: 146, name: "Countries.SM" },
  { id: 147, name: "Countries.ST" },
  { id: 148, name: "Countries.SA" },
  { id: 149, name: "Countries.SN" },
  { id: 150, name: "Countries.RS" },
  { id: 151, name: "Countries.SC" },
  { id: 152, name: "Countries.SL" },
  { id: 153, name: "Countries.SG" },
  { id: 154, name: "Countries.SK" },
  { id: 155, name: "Countries.SI" },
  { id: 156, name: "Countries.SB" },
  { id: 157, name: "Countries.SO" },
  { id: 158, name: "Countries.ZA" },
  { id: 159, name: "Countries.SS" },
  { id: 160, name: "Countries.ES" },
  { id: 161, name: "Countries.LK" },
  { id: 162, name: "Countries.SD" },
  { id: 163, name: "Countries.SR" },
  { id: 164, name: "Countries.SE" },
  { id: 165, name: "Countries.CH" },
  { id: 166, name: "Countries.SY" },
  { id: 167, name: "Countries.TJ" },
  { id: 168, name: "Countries.TZ" },
  { id: 169, name: "Countries.TH" },
  { id: 170, name: "Countries.TL" },
  { id: 171, name: "Countries.TG" },
  { id: 172, name: "Countries.TO" },
  { id: 173, name: "Countries.TT" },
  { id: 174, name: "Countries.TN" },
  { id: 175, name: "Countries.TR" },
  { id: 176, name: "Countries.TM" },
  { id: 177, name: "Countries.TV" },
  { id: 178, name: "Countries.UG" },
  { id: 179, name: "Countries.UA" },
  { id: 180, name: "Countries.AE" },
  { id: 181, name: "Countries.GB" },
  { id: 182, name: "Countries.US" },
  { id: 183, name: "Countries.UY" },
  { id: 184, name: "Countries.UZ" },
  { id: 185, name: "Countries.VU" },
  { id: 186, name: "Countries.VE" },
  { id: 187, name: "Countries.VN" },
  { id: 188, name: "Countries.YE" },
  { id: 189, name: "Countries.ZM" },
  { id: 190, name: "Countries.ZW" },
];
