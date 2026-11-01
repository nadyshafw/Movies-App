import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from 'axios'
import { baseUrl } from "../constant/baseUrl";
import Toastify from 'toastify-js'

export default function Movies() {
    const [movies, setMovies] = useState([])
    // console.log(movies);

    async function fetchMovies() {
        try {
            const { data } = await axios.get(`${baseUrl}/apis/movies/movies`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            // console.log(data);
            // console.log(localStorage.token);
            setMovies(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete(id) {
        try {
            const { data } = await axios.delete(`${baseUrl}/apis/movies/movies/${id}`, {
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
            
            fetchMovies()
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

    async function handleUpload(u, id) {
        try {
            const formData = new FormData();
            formData.append("file", u.target.files[0])

            const data = await axios.patch(`${baseUrl}/apis/movies/movies/${id}`, formData, {
                headers: {
                    Authorization: (`Bearer ${localStorage.token}`)
                }
            })
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

            fetchMovies()
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
            <div className="overflow-x-auto p-4 mt-7">
                <div className="mb-3 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-pink-500">Movie List</h1>
                    <Link to={"/add"}>
                        <button className="rounded bg-pink-500 px-4 py-1.5 text-sm text-white">
                            + Add Movie
                        </button>
                    </Link>
                </div>

                <div className="overflow-x-auto mt-7">
                    <table className="w-full border-collapse table-fixed">
                        <thead className="bg-black text-white border-b-4 border-black">
                            <tr>
                                <th className="w-12 border border-gray-400 px-4 py-2 text-left font-bold text-pink-300">
                                    No
                                </th>
                                <th className="w-40 border border-gray-400 px-4 py-2 text-left font-bold text-pink-300">
                                    Title
                                </th>
                                <th className="w-64 border border-gray-400 px-4 py-2 text-left font-bold text-pink-300">
                                    Synopsis
                                </th>
                                <th className="border border-gray-400 px-4 py-2 text-left font-bold text-pink-300">
                                    Trailer
                                </th>
                                <th className="border border-gray-400 px-4 py-2 text-left font-bold text-pink-300">
                                    Image Url
                                </th>
                                <th className="w-24 border border-gray-400 px-4 py-2 text-left font-bold text-pink-300">
                                    Rating
                                </th>
                                <th className="w-32 border border-gray-400 px-4 py-2 text-left font-bold text-pink-300">
                                    Genre
                                </th>
                                <th className="w-48 border border-gray-400 px-4 py-2 text-left font-bold text-pink-300">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {movies.map((p, index) => {
                                return (
                                    <tr key={p.id}>
                                        <td className="border border-gray-400 px-4 py-2 font-medium">{index + 1}</td>
                                        <td className="border border-gray-400 px-4 py-2 font-medium">{p.title}</td>
                                        <td className="border border-gray-400 px-4 py-2 font-medium">
                                            <div className="line-clamp-3">
                                                {p.synopsis}
                                            </div>
                                        </td>
                                        <td className="border border-gray-400 px-4 py-2 font-medium">
                                            <div className="line-clamp-2">
                                                {p.trailerUrl}
                                            </div>
                                        </td>
                                        <td className="border border-gray-400 px-4 py-2 font-medium">
                                            <div className="line-clamp-2">
                                                {p.imgUrl}
                                            </div>
                                        </td>
                                        <td className="border border-gray-400 px-4 py-2 font-medium">{p.rating}</td>
                                        <td className="border border-gray-400 px-4 py-2 font-medium">{p.genre?.name}</td>
                                        <td className="border border-gray-400 px-4 py-2 font-medium">
                                            <div className="flex gap-5 justify-center">
                                                <Link to={`/edit/${p.id}`}
                                                    className="text-xl">
                                                    ✎
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(p.id)}
                                                    className="text-xl"
                                                >
                                                    🗑️
                                                </button>

                                                <Link to={`/detail/${p.id}`} 
                                                    className="text-xl">
                                                    ☰
                                                </Link>

                                                <label>
                                                    <input type="file" className="hidden" onChange={(e) => handleUpload(e, p.id)}/>
                                                    ✚
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}