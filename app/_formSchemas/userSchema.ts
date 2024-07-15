import { z } from "zod";

export const UserSchema = z.object({
  Religion: z
    .string({
      required_error: "Religion is required",
      invalid_type_error: "Religion must be a string",
    })
    .min(3, { message: "Religion name is too short" })
    .max(100, { message: "Religion name is too long" }),
  NationalIdNumber: z
    .string({
      required_error: "National ID Number is required",
      invalid_type_error: "National ID Number must be a string",
    })
    .min(3, { message: "National ID Number is too short" })
    .max(100, { message: "National ID Number is too long" }),
  Nationality: z
    .string({
      required_error: "Nationality is required",
      invalid_type_error: "Nationality must be a string",
    })
    .min(3, { message: "Nationality is too short" })
    .max(100, { message: "Nationality is too long" }),
  MaritalStatus: z.enum(["single", "married", "widowed"], {
    required_error: "Marital Status is required",
    invalid_type_error:
      "Marital Status must be one of 'single', 'married', or 'widowed'",
  }),
  DateOfBirth: z
    .string({
      required_error: "Date of Birth is required",
      invalid_type_error: "Date of Birth must be a string",
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Date of Birth must be a valid date",
    }),
  Gender: z.enum(["male", "female"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be one of 'male' or 'female'",
  }),
  PhoneNumber: z
    .string({
      required_error: "Phone Number is required",
      invalid_type_error: "Phone Number must be a string",
    })
    .min(10, { message: "Phone Number is too short" })
    .max(15, { message: "Phone Number is too long" })
    .regex(/^\+?[0-9]*$/, { message: "Phone Number must be a valid number" }),
  ProfileComplete: z.boolean({
    required_error: "Profile Complete status is required",
    invalid_type_error: "Profile Complete must be a boolean",
  }),
});
