import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NewPasswordValidation } from "@/lib/Validations"
import Loader from "@/components/Shared/Loader"
import CustomToaster from "@/components/Shared/CustomToaster"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import AxiosClient from "@/config/AxiosClient"
import 'react-toastify/dist/ReactToastify.css';


const NewPassword = () => {
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordMdificado, setPasswordMdificado] = useState(false)
    const params = useParams()
    const { token } = params

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await AxiosClient(`/users/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                CustomToaster(error.response.data.msg, 'error', 'top-left')
            }
        }
        comprobarToken()
    }, [])

    const isLoading = false

    // 1. Define your form.
    const form = useForm<z.infer<typeof NewPasswordValidation>>({
        resolver: zodResolver(NewPasswordValidation),
        defaultValues: {
            password: "",
            password2: "",
        },
    })

    // 2. Define a submit handler.
    const handleNewPass = async (values: z.infer<typeof NewPasswordValidation>) => {
        if (values.password !== values.password2 || values.password.length < 0 || values.password2.length < 0) {
            CustomToaster('Verifique las Contraseñas', 'info', 'top-left')
            return
        }
        try {
            const url = `/users/olvide-password/${token}`
            const { data } = await AxiosClient.post(url, {
                password: values.password
            })
            CustomToaster(data.msg, 'success', 'top-center')
            setPasswordMdificado(true)
        } catch (error) {
            setPasswordMdificado(false)
            CustomToaster(error.response.data.msg, 'info', 'top-left')
        }
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <div className="sm:w-420 flex-center flex-col">
                    <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                        Ingresa tu nueva Contraseña
                    </h2>
                    <p className="text-light-3 small-medium md:base-regular mt-2">
                        Reestablece Tu Password y No Pierdas Acceso
                    </p>
                </div>
                {tokenValido && (
                    <form onSubmit={form.handleSubmit(handleNewPass)} className="flex flex-col gap-5 w-full mt-4">
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
                            ) : "Guardar Contraseña"}
                        </Button>
                    </form>
                )}
                {passwordMdificado && (
                    <Link
                        className='block text-center my-5 text-slate-50 uppercase text-sm'
                        to={'/sign-in'}
                    >Puedes Iniciar Sesión</Link>
                )}
            </div>
        </Form>
    )
}

export default NewPassword