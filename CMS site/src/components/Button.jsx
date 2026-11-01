export default function Button({ nameButton }) {
    return (
        <>
            <button type="submit" 
                className="w-full mt-7 rounded-md justify-center py-2 px-4 border-2 border-pink-500 text-sm font-medium text-white bg-pink-500 hover:text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                {nameButton}
            </button>
        </>
    )   
}