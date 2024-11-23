import { z } from "zod";

export const UserSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .max(20, "Username must be at most 20 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    isActive: z
      .union([z.boolean(), z.string()])
      .transform((value) =>
        value === true || value === "true" || value === "Yes" ? true : false
      ),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Password and Confirm Password must match",
      path: ["confirmPassword"],
    }
  );
