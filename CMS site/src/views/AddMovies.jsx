import axios from "axios";
import Form from "../components/FormMovies";
import Toastify from 'toastify-js'
import { useNavigate } from "react-router";
import { baseUrl } from "../constant/baseUrl";

export default function AddMovie() {
    const navigate = useNavigate()

    async function handleSubmit(e, form) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/apis/movies/movies`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            // console.log(data);
            Toastify({
                text: data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#228B22",
                },
            }).showToast();

            navigate("/")
        } catch (error) {
            console.log(error.response);
            Toastify({
                text: error.response.data.message,
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
        }
    }

    return (
        <>
            <Form nameForm="Add Movie" handleSubmit={handleSubmit}/>
        </>
    )
}