export default function Navbar({ search, setSearch, handleSearch }) {
    return (
        <>
            {/* navbar */}
            <nav id="navbar" className="flex justify-between bg-black p-4">
                <div className="flex items-center gap-6">
                    <h1 className="text-pink-500 font-bold text-2xl">NONTON</h1>
                    <p className="text-sm font-bold text-gray-400">HOME</p>
                </div>

                <div>
                    <form 
                        onSubmit={handleSearch}
                        className="flex sm:flex-row gap-2">
                        <div className="flex-1">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search movie by title"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full text-white border border-gray-300 shadow px-7 py-1 font-sm focus:outline-none focus:ring-0 focus:border-white"
                        />
                        </div>
                        <button
                            type="submit"
                            className="bg-pink-500 px-3 text-white font-bold hover:text-gray-500"
                            >
                            ⌕
                        </button>
                    </form>
                </div>
            </nav>
        </>
    )
}