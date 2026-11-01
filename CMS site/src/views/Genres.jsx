import axios from "axios";
import { useEffect, useState } from "react"
import { baseUrl } from "../constant/baseUrl";

export default function Genres() {
    const [genres, setGenres] = useState([])

    async function fetchGenres() {
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
        fetchGenres()
    }, [])

    return (
        <>
            <div className="overflow-x-auto p-4 mt-7">
                <div className="mb-3 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-pink-500">Genre List</h1>
                </div>

                <div className="overflow-x-auto mt-7">
                    <table className="w-full border-collapse">
                        <thead className="bg-black text-white border-b-4 border-black">
                            <tr>
                                <th className="w-12 border border-gray-400 px-4 py-2 text-left font-bold text-pink-300">
                                    No
                                </th>
                                <th className="w-24 border border-gray-400 px-4 py-2 text-left font-bold text-pink-300">
                                    Genre
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {genres.map((g, index) => {
                                return (
                                    <tr key={g.id}>
                                        <td className="border border-gray-400 px-4 py-2 font-medium">{index + 1}</td>
                                        <td className="border border-gray-400 px-4 py-2 font-medium">{g.name}</td> 
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