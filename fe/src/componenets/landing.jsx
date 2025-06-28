import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();
    return(
    <div className="bg-white">
        <div className="relative isolate px-6 pt-0 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-center">
                    <h3 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                        Broadcasting App
                    </h3>
                    <div className="mt-20 flex items-center justify-center gap-x-6">
                        <button
                            onClick={() => navigate('/login')}
                            className="rounded-md bg-black px-8 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-700"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                                className="rounded-md bg-black px-6 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-700"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}

export default Landing;
