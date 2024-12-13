import { EnumGender } from "../../../Enums";

//Base api response
export interface IFetchPerson {
  personId: number;
  nationalNo: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  gender: EnumGender;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string;
  imagePath: string; // Now allows undefined
  countryId: number;
  countryName: string;
  isUser: boolean;
}

// default for add,  update person
export interface IPostPerson {
  personId: number;
  nationalNo: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  gender: EnumGender;
  phone: string;
  email: string;
  address: string;
  countryId: number;
  dateOfBirth: string;
  ImageFile: File | null;
  ImagePath: string | null;
}

// For the detail page
export interface IPersonDetailData {
  personId: number;
  nationalNo: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  gender: EnumGender;
  phone: string;
  email: string;
  countryName: string;
  address: string;
  dateOfBirth: string;
  imagePath: string | null;
}

// For people table
export interface IPersonTableData {
  personId: number;
  nationalNo: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  dateOfBirth: string;
  lastName: string;
  gender: EnumGender;
  phone: string;
  email: string;
  address: string;
  countryName: string;
}
