import { toast } from 'react-toastify';

const CustomToaster = (message, type, position = 'top-center') => {
    const options = {
        position,
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };
    switch (type) {
        case 'success':
            toast.success(message, options);
            break;
        case 'error':
            toast.error(message, options);
            break;
        case 'info':
            toast.info(message, options);
            break;
        default:
            toast(message, options);
    }
}

export default CustomToaster