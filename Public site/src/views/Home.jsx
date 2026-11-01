import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from 'axios'
import { baseUrl } from "../constant/baseUrl";
import Navbar from "../components/Navbar";

export default function Home() {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const pagination = handlePagination()
    const [genres, setGenres] = useState([])
    const [filter, setFilter] = useState("")
    const [sort, setSort] = useState("DESC")

    
    async function fetchMovies() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${baseUrl}/apis/pub/movies/movies?limit=12&q=${search}&page=${currentPage}&i=${filter}&sort=${sort}`)

            setMovies(data.data)
            setTotalPages(data.meta.totalPages)
            setCurrentPage(data.meta.page)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    function handlePagination() {
        let result = []
        for (let i = 1; i <= totalPages; i++) {
            result.push(i)
        }
        return result
        // console.log(result);
    }

    function handleSearch(se) {
        se.preventDefault()
    }

    async function fetchGenres() {
        try {
            const { data } = await axios.get(`${baseUrl}/apis/pub/movies/genres`)
            setGenres(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchGenres()
    }, [])

    function handleFilter(e) {
        setFilter(e.target.value)
        setCurrentPage(1)
    }

    function handleSort(e) {
        setSort(e.target.value)
        setCurrentPage(1)
    }

    function handlePrev() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function handleNext() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [currentPage, filter, search, sort])

    return (
        <>
            <Navbar
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />

            <div className="px-3 mt-3">
                <div className="grid grid-cols-2 gap-3">
                    {/* sort */}
                    <div>
                        <label className="mb-2 block text-sm text-gray-400">Sort by</label>
                        <select onChange={handleSort} 
                            className="w-full rounded border border-gray-400 px-2 py-1.5 text-sm">
                            <option value="DESC">Terbaru</option>
                            <option value="ASC">Terlama</option>
                        </select>
                    </div>
                    {/* filter */}
                    <div>
                        <label className="mb-2 block text-sm text-gray-400">
                            Filter by genre
                        </label>
                        <select onChange={handleFilter}
                            className="w-full rounded border border-gray-400 px-2 py-1.5 text-sm">
                            <option value="">Semua genre</option>
                            {genres.map((g) => {
                                return (
                                    <option value={g.name} key={g.id}>{g.name}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>

                <div className="mt-7">
                    <h1 className="text-2xl font-bold text-pink-500 mb-5">Movie List</h1>

                    {loading ?
                        (
                            <p>Loading ...</p>
                        ) : (
                            <>
                                {/* card */}
                                <main className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                                    {movies.map((movie) => {
                                        return (
                                            <Card key={movie.id} movie={movie} />
                                        )
                                    })}
                                </main>
                            </>
                        )
                    }
                </div>

                {/* pagination */}
                <div key={pagination} 
                    className="flex justify-center items-center gap-2 mt-8 mb-8">
                    <button className="px-3 py-2 rounded-md bg-black text-white hover:bg-pink-500"
                        onClick={handlePrev}>
                        Prev
                    </button>
                
                    {pagination.map((p) => {
                        return (
                            <button className={`w-10 h-10 rounded-md border-pink-300 border-2 text-black font-semibold hover:bg-pink-500 ${p === currentPage ? "bg-pink-500" : ""}`}
                                onClick={() => setCurrentPage(p)}>
                                {p}
                            </button>
                        )
                    })}

                    <button className="px-3 py-2 rounded-md bg-black text-white hover:bg-pink-500"
                        onClick={handleNext}>
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}