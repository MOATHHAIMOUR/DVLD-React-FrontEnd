import { z } from "zod";

export const ApplicationTypeSchema = z.object({
  applicationTypeTitle: z.string().max(150, {
    message: "ApplicationTypeTitle must not exceed 150 characters.",
  }),
  applicationFees: z
    .number()
    .positive({ message: "ApplicationFees must be a positive number." })
    .refine((val) => !isNaN(val), {
      message: "ApplicationFees must be a valid number.",
    }),
});
