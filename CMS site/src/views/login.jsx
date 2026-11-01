import { useState } from "react"
import axios from 'axios'
import { baseUrl } from "../constant/baseUrl"
import Toastify from 'toastify-js'
import { Navigate, useNavigate } from "react-router"
import Button from "../components/Button"

export default function Login() {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handlePage(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/apis/auth/login`, { email, password })
            localStorage.setItem('token', data.data.token)
            // console.log("success", data);
            navigate("/")
        } catch (error) {
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

    if (localStorage.token) {
        Toastify({
            text: "You already logged in",
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
        return <Navigate to={"/"}/>
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full rounded-xl bg-gray-800 shadow-lg p-7 max-w-sm">
                    <h1 className="text-3xl font-bold text-pink-500 text-center">LOGIN</h1>
                    <p />

                    <form onSubmit={handlePage}
                        className="mt-4">
                        <div>
                            <label className="text-white font-semibold text-sm">Email</label>
                            <input
                            type="email"
                            id="email"
                            className="bg-white w-full p-2 border-2 border-black rounded-md"
                            placeholder="selamat@email.com"
                            autoComplete="current-email"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mt-1">
                            <label className="text-white font-semibold text-sm">Password</label>
                            <input
                            type="password"
                            id="password"
                            className="bg-white w-full p-2 border-2 border-black rounded-md"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        
                        
                        <Button nameButton="Login"/>
                    </form>
                </div>
            </div>
        </>
    )
}