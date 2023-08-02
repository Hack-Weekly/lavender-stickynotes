import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo 1.png"
import landing from "../images/landing1.png"

export const LandingPage = () => {
    return (
        <div class="page h-screen w-screen flex flex-col overflow-x-hidden md:px-0 lg:px-12 xl:px-36">
            <header className="h-fit flex justify-center items-center">
                <img src={logo} class="h-24" alt="sick notes logo"></img>
            </header>

            <main className="flex flex-10 justify-center items-center md:flex-col sm:flex-col lg:flex-row">

                <div className="copy lg:p-16 flex w-1/2 flex-col justify-center items-center">
                    <h1 className="text-6xl font-bold text-left leading-normal md:text-center sm:text-center lg:text-left">Organize your notes with ease</h1>
                    <p className="mt-4 leading-relaxed sm:mt-6">Sticky Notes let's you easily organize your notes visually for maximum flexibility and utility. Create groups with family, friends, and all your teams. You can create new projects to keep all notes organized at all times.</p>
                    <Link to="/signup">
                        <button className="signup-btn align-middle font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-full text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block mt-6 bg-pink-300 sm:mt-8">Sign Up</button>
                    </Link>
                </div>

                <div className="images p-8 flex flex-col w-1/2 justify-center items-center w-max md:mt-16 sm:mt-24">
                    <img src={landing} class="rounded-lg border-2 border-pink-100 max-w-xs" alt="screenshot of sticky notes UI "></img>
                </div>

            </main>

            <div className="features">
                <div className="img-copy p-16 flex justify-center items-center md:space-x-32 md:flex-row sm:flex-col">

                    <div class="sm:mt-16 lg:mt-0 flex flex-col justify-center items-center">
                        <p className="text-blue-gray-700 font-sans font-bold">Drag Notes</p>
                        <hr class="mt-2 w-full"></hr>
                        <i class="fa-solid fa-hand-point-left text-6xl text-pink-200 mt-4"></i>
                    </div>

                    <div class="sm:mt-16 lg:mt-0 flex flex-col justify-center items-center">
                        <p className="text-blue-gray-700 font-sans font-bold">Create Teams</p>
                        <hr class="mt-2 w-full"></hr>
                        <i class="fa-solid fa-people-group text-6xl text-pink-200  mt-4"></i>
                    </div>

                    <div class="sm:mt-16 lg:mt-0 flex flex-col justify-center items-center">
                        <p className="text-blue-gray-700 font-sans font-bold">Organize by Project</p>
                        <hr class="mt-2 w-full"></hr>
                        <i class="fa-solid fa-boxes-stacked text-6xl text-pink-200  mt-4 w-min"></i>
                    </div>
                </div>
            </div>

            <footer class="text-center flex flex-1 h-1/6 justify-center items-center font-thin">Team Lavender Snake 2023</footer>
        </div>
    )
}
