export interface IPerson {
  personId: number;
  nationalNo: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  gender: "M" | "F"; // Assuming gender is a char ('M' or 'F')
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string; // ISO date string format (e.g., "2003-10-03T00:00:00")
  image: string | null; // Can be a URL string or null
  countryName: string;
}
