import * as z from "zod";

export const SignUpValidation = z.object({
    nombre: z.string().min(2, {
        message: "El nombre es muy corto, favor verifique su nombre.",
    }),
    email: z.string().email(),
    password: z.string().min(8, {
        message: "La contraseña tiene que ser al menos de 8 caracteres.",
    }),
    password2: z.string().min(8, {
        message: "La contraseña tiene que ser al menos de 8 caracteres.",
    }),
})

export const SignInValidation = z.object({
    nombre: z.string().min(2, {
        message: "El nombre es muy corto, favor verifique su nombre.",
    }),
    email: z.string().email(),
    password: z.string().min(8, {
        message: "La contraseña tiene que ser al menos de 8 caracteres.",
    }),
})

export const ForgetPasswordValidation = z.object({
    email: z.string().email(),
})

export const NewPasswordValidation = z.object({
    password: z.string().min(8, {
        message: "La contraseña tiene que ser al menos de 8 caracteres.",
    }),
    password2: z.string().min(8, {
        message: "La contraseña tiene que ser al menos de 8 caracteres.",
    }),
})
