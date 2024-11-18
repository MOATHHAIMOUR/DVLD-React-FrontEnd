import { z } from "zod";

export const personSchema = z.object({
  nationalNo: z
    .string()
    .min(1, "National Number is required")
    .regex(/^\d+$/, "National Number must be numeric"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters long"),
  secondName: z
    .string()
    .min(1, "Second name is required")
    .min(2, "Second name must be at least 2 characters long"),
  thirdName: z
    .string()
    .min(1, "Third name is required")
    .min(2, "Third name must be at least 2 characters long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters long"),
  gender: z
    .string()
    .min(1, "Gender is required")
    .refine(
      (value) => ["male", "female"].includes(value),
      "Gender must be 'Male' or 'Female'"
    ),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d-+()]+$/, "Phone number format is invalid"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters long"),
  dateOfBirth: z.coerce.date().refine(
    (date) => !isNaN(date.getTime()), // Ensure it's a valid date
    {
      message: "Date of birth must be a valid date",
    }
  ),

  //image: z.string().nullable(),

  countryId: z
    .number()
    .int("Country ID must be an integer")
    .positive("Country ID must be a positive number"),
});
