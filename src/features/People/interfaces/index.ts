// Display Person Information
export interface IPerson {
  personId?: number;
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

// Post New Person
export interface IPostPerson {
  nationalNo: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: Date; // Or string if you handle date as ISO string in form
  image?: string | null; // Allow image to be null or undefined to match the schema
  countryId: number;
}
