import { useEffect, useState } from "react";
import Form from "../components/FormMovies";
import { useNavigate, useParams } from "react-router";
import Toastify from 'toastify-js'
import axios from "axios";
import { baseUrl } from "../constant/baseUrl";

export default function EditMovie() {
    const [movies, setMovie] = useState({})
    const { id } = useParams() 
    const navigate = useNavigate()

     async function handleSubmit(e, form) {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${baseUrl}/apis/movies/movies/${id}`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            console.log(data);
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

    async function fetchMovies() {
        try {
            const { data } = await axios.get(`${baseUrl}/apis/movies/movies/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            setMovie(data.data)
        } catch (error) {
            console.log(error);
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

    useEffect(() => {
        fetchMovies()
    }, [])

    return (
        <>
            <Form nameForm="Edit Movie" movies={movies} handleSubmit={handleSubmit}/>
        </>
    )
}