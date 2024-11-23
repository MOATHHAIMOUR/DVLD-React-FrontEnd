//Base api response
export interface IApiPerson {
  personId: number;
  nationalNo: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string;
  imagePath?: string | null; // Now allows undefined
  countryId: number;
  countryName: string;
  isUser: boolean;
}

// default for add,  update person
export interface IPerson {
  personId: number;
  nationalNo: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string;
  imagePath?: string | null; // Now allows undefined
  countryId: number;
}

// For the detail page
export interface IPersonDetailData {
  personId: number;
  nationalNo: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  gender: string;
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
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string;
  countryName: string;
}
