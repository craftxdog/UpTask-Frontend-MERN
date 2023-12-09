import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NewPasswordValidation } from "@/lib/Validations"
import Loader from "@/components/Shared/Loader"



const NewPassword = () => {

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
    const handleNewPass = (values: z.infer<typeof NewPasswordValidation>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
            </div>
        </Form>
    )
}

export default NewPassword