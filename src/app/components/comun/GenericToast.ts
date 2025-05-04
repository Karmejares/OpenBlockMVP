import { toast } from 'react-toastify';

export function GenericToast() {
    const SuccessNotify = (text:string) => toast.success(`${text}`, {
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
    });

    const ErrorNotify = (text:string) => toast.error(`${text}`, {
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
    });

    const WarningNotify = (text:string) => toast.warning(`${text}`, {
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
    });


    return {
        SuccessNotify,
        ErrorNotify,
        WarningNotify
    }
}