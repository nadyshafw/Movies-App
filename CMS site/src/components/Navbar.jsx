import {  Link, NavLink, useNavigate } from "react-router";

export default function Navbar() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <>
            {/* navbar */}
            <nav id="navbar" className="flex justify-between bg-black p-4">
                <div className="flex items-center gap-6">
                    <h1 className="text-pink-500 font-bold text-2xl">NONTON</h1>

                    <NavLink to={"/"}
                        className={({ isActive }) =>
                            isActive ? "text-white" : "text-gray-400"
                        }
                    >
                        <p className="text-sm font-bold">
                            MOVIES
                        </p>
                    </NavLink>

                    <NavLink to={"/genres"}
                        className={({ isActive }) =>
                            isActive ? "text-white" : "text-gray-400"
                        }
                    >
                        <p className="text-sm font-bold">GENRES</p>
                    </NavLink>
                </div>

                <div className="flex gap-3">
                    <Link to={"/regis"} 
                        className="text-gray-400 hover:text-white text-sm font-bold">
                        ADD USER 👤
                    </Link>
                    
                    <p onClick={handleLogout}
                        className="text-gray-400 hover:text-white text-sm font-bold">
                        LOG OUT ➜]
                    </p>
                </div>
            </nav>
        </>
    )
}