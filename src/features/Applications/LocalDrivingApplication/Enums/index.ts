export enum EnumApplicationStatus {
  New = 1,
  Cancelled = 2,
  Completed = 3,
}

export function ConvertEnumApplicationStatusToString(
  applicationStatus: EnumApplicationStatus
): string {
  if (applicationStatus === EnumApplicationStatus.New) return "New";
  else if (applicationStatus === EnumApplicationStatus.Cancelled)
    return "Cancelled";
  else return "Completed";
}
export function ConvertStringEnumApplicationStatusToEnum(
  applicationStatus: string
): EnumApplicationStatus {
  if (applicationStatus === "New") return EnumApplicationStatus.New;
  else if (applicationStatus === "Cancelled")
    return EnumApplicationStatus.Cancelled;
  else return EnumApplicationStatus.Completed;
}

export enum EnumApplicationType {
  NewLocalDrivingLicenseService = 1,
  RenewDrivingLicenseService = 2,
  ReplacementForLostDrivingLicense = 3,
  ReplacementForDamagedDrivingLicense = 4,
  ReleaseDetainedDrivingLicense = 5,
  NewInternationalLicense = 6,
  RetakeTest = 7,
}

export enum EnumLicenseClass {
  SmallMotorcycle = 1,
  HeavyMotorcycleLicense = 2,
  OrdinaryDrivingLicense = 3,
  Commercial = 4,
  Agricultural = 5,
  SmallAndMediumBus = 6,
  TruckAndHeavyVehicle = 7,
}

export const stringToEnumNumberMap: { [key: string]: EnumLicenseClass } = {
  SmallMotorcycle: EnumLicenseClass.SmallMotorcycle,
  HeavyMotorcycleLicense: EnumLicenseClass.HeavyMotorcycleLicense,
  OrdinaryDrivingLicense: EnumLicenseClass.OrdinaryDrivingLicense,
  Commercial: EnumLicenseClass.Commercial,
  Agricultural: EnumLicenseClass.Agricultural,
  SmallAndMediumBus: EnumLicenseClass.SmallAndMediumBus,
  TruckAndHeavyVehicle: EnumLicenseClass.TruckAndHeavyVehicle,
};
