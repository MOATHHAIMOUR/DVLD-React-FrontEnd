import * as yup from "yup";

const personValidationSchema = yup.object().shape({
  nationalNo: yup
    .string()
    .required("National Number is required")
    .matches(/^\d+$/, "National Number must be numeric"),

  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters long"),

  secondName: yup
    .string()
    .required("Second name is required")
    .min(2, "Second name must be at least 2 characters long"),

  thirdName: yup
    .string()
    .required("Third name is required")
    .min(2, "Third name must be at least 2 characters long"),

  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters long"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[\d-+()]+$/, "Phone number format is invalid"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters long"),

  dateOfBirth: yup
    .date()
    .required("Date of birth is required")
    .typeError("Date of birth must be a valid date in ISO format"),

  image: yup.string().url("Image must be a valid URL").nullable(), // Allows the field to be null

  gender: yup.string().required("Gender is required"),

  countryId: yup
    .number()
    .required("Country ID is required")
    .positive("Country ID must be a positive number")
    .integer("Country ID must be an integer"),
});

export default personValidationSchema;
