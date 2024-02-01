import { $Enums } from "@prisma/client";
import * as yup from "yup";

export type SignUpUser = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  sex: $Enums.Sex;
  activityLevel: $Enums.ActivityLevel;
  height: number;
  weight: number;
  age: number;
};

export type SignUpUserForm = Omit<SignUpUser, "sex" | "activityLevel"> & {
  sex: string;
  activityLevel: string;
};

export const CreateUserSchema: yup.SchemaOf<SignUpUserForm> = yup.object({
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50)
    .required("Field is required"),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50)
    .required("Field is required"),
  username: yup.string().min(2).max(50).required("Field is required"),
  password: yup.string().min(2).max(50).required("Field is required"),
  sex: yup.string().required("Field is required"),
  activityLevel: yup.string().required("Field is required"),
  height: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(50)
    .max(250)
    .required("Field is required"),
  weight: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(30)
    .max(200)
    .required("Field is required"),
  age: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(10)
    .max(100)
    .required("Field is required"),
});
