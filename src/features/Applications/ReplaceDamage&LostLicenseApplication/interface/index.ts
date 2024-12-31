export interface ReplaceLicenseRequest {
  licenseId: number;
  createdByUserId: number;
}

export interface ReplaceLicenseLostResponse {
  applicationId: boolean;
  ReplacementForLostLicenseId: string;
}

export interface ReplaceLicenseDamageResponse {
  applicationId: boolean;
  ReplacementDamageForLicenseId: string;
}
