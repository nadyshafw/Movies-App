import axios from "axios";
import { useEffect, useState } from "react"
import { baseUrl } from "../constant/baseUrl";
import { Link } from "react-router";

export default function Form({ nameForm, handleSubmit, movies }) {
    const [genres, setGenres] = useState([])
    const [form, setForm] = useState({
        title: "",
        synopsis: "",
        trailerUrl: "",
        imgUrl: "",
        rating: 0,
        genreId: 0 
    })

    function handleForm(name, value) {
        setForm((oldValue) => {
            return {
                ...oldValue,
                [name]: value
            }
        })
    }

    async function genre() {
        try {
            const { data } = await axios.get(`${baseUrl}/apis/movies/genres`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            
            setGenres(data.data)
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        genre()
    }, [])

    useEffect(() => {
        if(movies) {
            setForm({
                title: movies.title,
                synopsis: movies.synopsis,
                trailerUrl: movies.trailerUrl,
                imgUrl: movies.imgUrl,
                rating: movies.rating,
                genreId: movies.genreId
            })
        }
    }, [movies])

    return (
        <>
            <div className="min-h-screen text-white">
                <main className="mx-auto max-w-2xl px-2 py-5">
                    <div className="rounded-xl border border-pink-200 bg-pink-100 p-6 text-black shadow-xl">

                        <div className="mb-4 text-center">
                            <h1 className="mt-2 text-2xl font-bold text-pink-500">{nameForm} ✨</h1>
                        </div>

                        <form onSubmit={(e) => handleSubmit(e, form)} 
                            className="space-y-4">
                            <div>
                                <label className="mb-1 block font-medium">Title</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => handleForm("title", e.target.value)}
                                    className="w-full rounded-lg border border-pink-200 bg-white p-3 outline-none focus:border-pink-500"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">Synopsis</label>
                                <textarea
                                    rows={4}
                                    className="w-full rounded-lg border border-pink-200 bg-white p-3 outline-none focus:border-pink-500"
                                    onChange={(e) => handleForm("synopsis", e.target.value)}
                                    value={form.synopsis}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block font-medium">Trailer URL</label>
                                    <input
                                    type="text"
                                    onChange={(e) => handleForm("trailerUrl", e.target.value)}
                                    className="w-full rounded-lg border border-pink-200 bg-white p-3 outline-none focus:border-pink-500"
                                    value={form.trailerUrl}
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block font-medium">Rating</label>
                                    <input
                                    type="number"
                                    onChange={(e) => handleForm("rating", +e.target.value)}
                                    className="w-full rounded-lg border border-pink-200 bg-white p-3 outline-none focus:border-pink-500"
                                    value={form.rating}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">Genre</label>
                                <select onChange={(e) => handleForm("genreId", +e.target.value)}
                                    value={form.genreId}
                                    className="w-full rounded-lg border border-pink-200 bg-white p-3 outline-none focus:border-pink-500">
                                    {genres.map((g) => {
                                        return (
                                            <option value={g.id} key={g.id}>{g.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">Image URL</label>
                                <input
                                    type="text"
                                    onChange={(e) => handleForm("imgUrl", e.target.value)}
                                    value={form.imgUrl}
                                    className="w-full rounded-lg border border-pink-200 bg-white p-3 outline-none focus:border-pink-500"
                                />
                            </div>

                            <div className="flex gap-3 pt-3">
                                <Link to={"/"}
                                    className="rounded-lg border border-pink-300 px-5 py-3 text-center font-semibold text-pink-500 transition hover:border-pink-700 w-1/3"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-pink-500 px-5 py-3 font-semibold text-white transition hover:bg-pink-600"
                                >
                                    {nameForm}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    )
}