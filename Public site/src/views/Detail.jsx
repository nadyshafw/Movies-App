import { Link, useParams } from "react-router";
import { baseUrl } from "../constant/baseUrl";
import Toastify from 'toastify-js'
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Detail() {
    const { id } = useParams()
    const [movies, setMovies] = useState({})
    const [loading, setLoading] = useState(false)

    async function fetchMovies() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${baseUrl}/apis/pub/movies/movies/${id}`)

            setMovies(data.data)
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
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    return (
        <>
            <Navbar/>

            <div key={movies.id} 
                className="mt-7 p-2">
                <h1 className="text-2xl font-bold text-pink-500 mb-2">Movie Detail</h1>

                {loading ?
                    (
                        <p>Loading ...</p>
                    ) : (
                        <>
                            <main className="mx-auto max-w-5xl p-6">
                                <h1 className="text-2xl font-bold text-pink-500 mb-5">{movies.title}</h1>
                                <div className="flex flex-col gap-6 rounded-xl bg-pink-100 p-5 sm:flex-row">
                                    {/* ImageUrl */}
                                    <img
                                        src={movies.imgUrl}
                                        alt={movies.title}
                                        className="h-96 w-64 self-center rounded-lg object-cover sm:self-start"
                                    />
                                    {/* Detail movie */}
                                    <div className="flex-1">
                                    <h1 className="text-3xl font-bold">
                                        {movies.title}
                                    </h1>
                                    <p className="mt-2 text-gray-600">{movies.genre?.name}</p>
                                    <p className="mt-4 text-lg font-semibold">⭐ {movies.rating} / 10</p>
                                    <div className="mt-5">
                                        <h3 className="mb-2 text-lg font-semibold">Synopsis</h3>
                                        <p className="leading-7 text-gray-700">
                                            {movies.synopsis}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="font-semibold">Author</h3>
                                        <p className="mt-1 text-gray-700">{movies.author?.username}</p>
                                    </div>
                                    <a
                                        href={movies.trailerUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 inline-block rounded-lg bg-pink-500 px-5 py-3 border-pink-500 font-semibold text-white transition hover:bg-pink-600"
                                    >
                                        ▶ Watch Trailer
                                    </a>
                                    </div>
                                </div>
                                <Link
                                    to={"/"}
                                    className="mt-6 inline-block text-sm font-medium text-pink-600 hover:text-pink-800"
                                >
                                    ← Back to Movie List
                                </Link>
                            </main>
                        </>
                    )
                }
            </div>
        </>
    )
}