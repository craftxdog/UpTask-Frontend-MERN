import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SignUpValidation } from "@/lib/Validations"
import Loader from "@/components/Shared/Loader"
import { Link } from "react-router-dom"
import AxiosClient from "@/config/AxiosClient"
import CustomToaster from "@/components/Shared/CustomToaster"
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react"

const SignUp = () => {

    const [isLoading, setIsLoading] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignUpValidation>>({
        resolver: zodResolver(SignUpValidation),
        defaultValues: {
            nombre: "",
            email: "",
            password: "",
            password2: "",
        },
    })

    // 2. Define a submit handler.
    const handleSignup = async (values: z.infer<typeof SignUpValidation>) => {
        if (values.password !== values.password2) {
            CustomToaster('Verifique las Contraseñas', 'error', 'top-center')
            return
        }
        setIsLoading(true);
        try {
            const { data } = await AxiosClient.post(`/users`, {
                name: values.nombre,
                email: values.email,
                password: values.password
            })
            await CustomToaster(data.msg, 'success', 'top-center');
            // CustomToaster (data.msg, 'info', 'top-left');
            
        } catch (error) {
            CustomToaster(error.response.data, 'error', 'top-center');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <div className="sm:w-420 flex-center flex-col">
                    <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                        Crea tu Cuenta Nueva
                    </h2>
                    <p className="text-light-3 small-medium md:base-regular mt-2">
                        Para Usar UpTask, por favor registre su Cuenta
                    </p>
                </div>
                <form onSubmit={form.handleSubmit(handleSignup)} className="flex flex-col gap-5 w-full mt-4">
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
                                    <Input type="text" placeholder="Correo Eléctronico" {...field} className="shad-input" />
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
                                    <Input type="password" placeholder="Escribe una Contraseña Fuerte" {...field} className="shad-input" />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Repetir Contraseña</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Repite la Contraseña Anterior" {...field} className="shad-input" />
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
                        ) : "Registrar Cuenta"}
                    </Button>
                    <nav className="lg:flex lg:justify-between">
                        <p className="text-small-regular text-light-2 text-center mt-2">
                            ¿Tienes una <Link to="/sign-in" className="text-primary-500 text-small-semibold">Cuenta</Link>?
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

export default SignUp