import { useState } from "react";
import { useNavigate } from "react-router";
import { baseUrl } from "../constant/baseUrl";
import axios from "axios";
import Toastify from 'toastify-js'
import Button from "../components/Button";

export default function AddUser() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "Staff",
        phoneNumber: "",
        address: ""
    })
    console.log(form);

    function handleForm(name, value) {
        setForm((oldValue) => {
            return {
                ...oldValue,
                [name]: value
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/apis/auth/add-user`, form, {
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

            navigate("/login")
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full rounded-xl bg-gray-800 shadow-lg p-7 max-w-md">
                    <h1 className="text-3xl font-bold text-pink-500 text-start">ADD USER</h1>
                    <p />

                    <div className="mt-4 space-y-3">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="text-white font-semibold text-sm">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="bg-white w-full p-2 border-2 border-black rounded-md"
                                    placeholder="Enter Your Username"
                                    onChange={(e) => handleForm("username", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-white font-semibold text-sm">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-white w-full p-2 border-2 border-black rounded-md"
                                    placeholder="Enter Your Email"
                                    onChange={(e) => handleForm("email", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-white font-semibold text-sm">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="bg-white w-full p-2 border-2 border-black rounded-md"
                                    placeholder="Enter Your Password"
                                    onChange={(e) => handleForm("password", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-white font-semibold text-sm">Role</label>
                                <input
                                    type="role"
                                    id="role"
                                    value={form.role}
                                    className="bg-white w-full p-2 border-2 border-black rounded-md"
                                    placeholder="Enter Your Password"
                                    onChange={(e) => handleForm("role", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-white font-semibold text-sm">Phone Number</label>
                                <input
                                    type="text"
                                    id="phone-number"
                                    className="bg-white w-full p-2 border-2 border-black rounded-md"
                                    placeholder="Enter Your Phone Number"
                                    onChange={(e) => handleForm("phoneNumber", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-white font-semibold text-sm">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="bg-white w-full p-2 border-2 border-black rounded-md"
                                    placeholder="Enter Your Address"
                                    onChange={(e) => handleForm("address", e.target.value)}
                                />
                            </div>
                            
                            <Button nameButton="Add User"/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}