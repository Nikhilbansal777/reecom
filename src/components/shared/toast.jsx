import { Bounce, toast } from "react-toastify";

const Toast = (message) => {
    console.log(message);
    return (
        toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce
        })
    );
};

export default Toast;