import { Link } from "react-router";

export default function Card({ movie }) {

    return (
        <>
            <div key={movie.id} >
                <div className="flex w-full items-center gap-3 rounded-lg bg-pink-100 p-2">
                    <img
                        src={movie.imgUrl}
                        alt={movie.title}
                        className="h-36 w-24 shrink-0 rounded-md object-cover"
                    />
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{movie.title}</h3>
                        <p className="text-sm text-gray-500">{movie.genre.name}</p>
                        <p className="text-sm font-medium text-gray-800">⭐ {movie.rating}</p>
                        <Link
                            to={`/detail/${movie.id}`}
                            className="mt-3 inline-block text-sm font-medium text-pink-600 hover:text-pink-800"
                            >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}