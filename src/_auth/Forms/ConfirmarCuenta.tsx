import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AxiosClient from '@/config/AxiosClient';
import CustomToaster from '@/components/Shared/CustomToaster'
import 'react-toastify/dist/ReactToastify.css';

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

    const params = useParams()
    const { id } = params

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/users/confirmar/${id}`
                const { data } = await AxiosClient(url)
                await CustomToaster(data.msg, 'success', 'top-center');
                setCuentaConfirmada(true)
            } catch (error) {
                CustomToaster(error.response.data.msg, 'error', 'top-center')
            }
        }
        confirmarCuenta()
    }, [])
    return (
        <>
            <div className="sm:w-420 flex-center flex-col">
                <div className="sm:w-420 flex-center flex-col">
                    <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                        Confirma Tu Cuenta
                    </h2>
                    <p className="text-light-3 small-medium md:base-regular mt-2">
                        Comienza a crear tus proyectos con UpTask
                    </p>
                </div>
            </div>
            <div>
                {cuentaConfirmada && (
                    <Link
                        className='block text-center my-5 text-slate-500 uppercase text-sm'
                        to={'/sign-in'}
                    >Puedes Iniciar Sesión</Link>
                )}
            </div>
        </>
    )
}

export default ConfirmarCuenta