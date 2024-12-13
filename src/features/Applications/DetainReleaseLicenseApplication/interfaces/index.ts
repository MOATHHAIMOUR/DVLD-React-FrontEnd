export interface IAddDetainLicense {
  licenseId: number;
  detainDate: string;
  fineFees: number;
  createdByUserId: number;
}

export interface IReleaseLicense {
  licenseId: number;
  releasedDate: string;
  releasedByUserId: number;
}
