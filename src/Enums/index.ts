export enum enumFormMode {
  Add = 0,
  Edit = 1,
}

export enum EnumGender {
  Male = 0,
  Female = 1,
}

export function ConvertGenderEnumToString(gender: EnumGender): string {
  return gender === EnumGender.Female ? "Male" : "Female";
}
