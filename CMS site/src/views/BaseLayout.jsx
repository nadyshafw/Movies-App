import Navbar from "../components/Navbar";
import Toastify from 'toastify-js'
import { Navigate, Outlet } from "react-router";

export default function BaseLayout() {
    if (!localStorage.token) {
        Toastify({
            text: "Please Login First",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#D61313",
            },
        }).showToast();
        return <Navigate to={"/login"}/>
    }
    return (
        <>
            <div>
                <Navbar/>
                <Outlet />
            </div>
        </>
    )
}