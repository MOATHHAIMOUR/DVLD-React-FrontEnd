import {
  EnumApplicationStatus,
  EnumApplicationType,
  EnumLicenseClass,
} from "../Enums";

export interface ILocalDrivingApplication {
  localDrivingLicenseApplicationId: number;
  className: string;
  fullName: string;
  applicationDate: Date;
  passedTests: string;
  applicationStatus: EnumApplicationStatus;
}

export interface ILicenseClass {
  licenseClassId: number;
  className: string;
  classDescription: string;
  minimumAllowedAge: number;
  defaultValidityLength: number;
  classFees: number;
}

export interface AddNewLocalDrivingLicenseDTO {
  applicantPersonId: number;
  applicationTypeId: EnumApplicationType;
  createdByUserId: number;
  licenseClassId: EnumLicenseClass;
}

export interface ILicenseDetailsView {
  licenseClassId: EnumLicenseClass;
  className: string;
  fullName: string;
  licenseId: number;
  nationalNo: string;
  gender: string;
  issueDate: Date;
  issueReason?: number;
  notes: string;
  isActive: boolean;
  dateOfBirth: Date;
  driverId: number;
  expirationDate: Date;
  isDetain: boolean;
}
