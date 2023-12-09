import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ForgetPasswordValidation } from "@/lib/Validations"
import Loader from "@/components/Shared/Loader"
import { Link } from "react-router-dom"



const ForgetPassword = () => {

    const isLoading = false

    // 1. Define your form.
    const form = useForm<z.infer<typeof ForgetPasswordValidation>>({
        resolver: zodResolver(ForgetPasswordValidation),
        defaultValues: {
            email: "",
        },
    })

    // 2. Define a submit handler.
    const handleSignup = (values: z.infer<typeof ForgetPasswordValidation>) => {

        console.log(values)
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <div className="sm:w-420 flex-center flex-col">
                    <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                        Recupera tu Cuenta hoy Mismo
                    </h2>
                    <p className="text-light-3 small-medium md:base-regular mt-2">
                        Recupera tu Acceso y No Pierdas Tus Proyectos
                    </p>
                </div>
                <form onSubmit={form.handleSubmit(handleSignup)} className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Usa tu Email anterior" {...field} className="shad-input" />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="shad-button_primary">
                        {isLoading ? (
                            <>
                                <div className="flex-center gap-2">
                                    <Loader />Loading...
                                </div>
                            </>
                        ) : "Enviar Datos"}
                    </Button>
                    <nav className="lg:flex lg:justify-between">
                        <p className="text-small-regular text-light-2 text-center mt-2">
                            ¿Aún no tienes una <Link to="/sign-up" className="text-primary-500 text-small-semibold">Cuenta</Link>?
                        </p>
                        <p className="text-small-regular text-light-2 text-center mt-2 ml-5">
                            Puedes Iniciar <Link to="/sign-in" className="text-primary-500 text-small-semibold">Sesión</Link>
                        </p>
                    </nav>
                </form>
            </div>
        </Form>
    )
}

export default ForgetPassword