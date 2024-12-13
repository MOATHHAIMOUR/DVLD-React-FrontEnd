export interface IAddNewInternationalLicense {
  driverId: number;
  issuedUsingLocalLicenseId: number;
  issueDate: Date;
  expirationDate: Date;
  isActive: boolean;
  createdByUserId: number;
}

export interface IInternationalLicenseResult {
  applicationId: number;
  internationalLicenseId: number;
}

export interface IInternationalLicense {
  internationalLicenseId: number;
  applicationId: number;
  driverId: number;
  issuedUsingLocalLicenseId: number;
  issueDate: Date;
  expirationDate: Date;
  isActive: boolean;
  createdByUserId: number;
}
