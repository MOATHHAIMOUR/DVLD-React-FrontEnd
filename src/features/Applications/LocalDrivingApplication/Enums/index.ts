export enum EnumApplicationStatus {
  New = "New",
  Cancelled = "Cancelled",
  Completed = "Completed",
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
