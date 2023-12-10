import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SignInValidation } from "@/lib/Validations/index.ts"
import Loader from "@/components/Shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import CustomToaster from "@/components/Shared/CustomToaster"
import AxiosClient from "@/config/AxiosClient"

const SignIn = () => {
    
    const isLoading = false

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignInValidation>>({
        resolver: zodResolver(SignInValidation),
        defaultValues: {
            nombre: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const handleSignin = async (values: z.infer<typeof SignInValidation>) => {
        try {
            const { data } = await AxiosClient.post('/users/login', {
                email:values.email,
                password:values.password
            })
            CustomToaster(data.msg, 'success', 'top-center')
        } catch (error) {
            CustomToaster(error.response.data.msg, 'error', 'top-right')
        }
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <div className="sm:w-420 flex-center flex-col">
                    <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                        Inicia Sesión Con tu Cuenta
                    </h2>
                    <p className="text-light-3 small-medium md:base-regular mt-2">
                        Para Usar UpTask, por favor registre su Cuenta
                    </p>
                </div>
                <form onSubmit={form.handleSubmit(handleSignin)} className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Nombre de Usuario" {...field} className="shad-input" />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Correo eléctronico" {...field} className="shad-input" />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Escribe un Contraseña Fuerte" {...field} className="shad-input" />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="shad-button_primary">
                        {isLoading ? (
                            <div className="flex-center gap-2">
                                <Loader />Loading...
                            </div>
                        ) : "Iniciar Sesión"}
                    </Button>
                    <nav className="lg:flex lg:justify-between">
                        <p className="text-small-regular text-light-2 text-center mt-2">
                            ¿Aún no tienes una <Link to="/sign-up" className="text-primary-500 text-small-semibold">Cuenta</Link>?
                        </p>
                        <p className="text-small-regular text-light-2 text-center mt-2 ml-5">
                            Olvidé mi <Link to="/olvide-password" className="text-primary-500 text-small-semibold">Contraseña</Link>
                        </p>
                    </nav>
                </form>
            </div>
        </Form>
    )
}

export default SignIn