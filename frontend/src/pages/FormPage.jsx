import { Login } from "../components/Login";
import { Signup } from "../components/Signup";

export const FormPage = ({ isLogin }) => {
  return (
    <div className="grid h-screen w-screen bg-[#fafafa] sm:grid-cols-1 md:grid-cols-3">
      <div className="col-span-1 grid h-full grid-cols-12 bg-pink-300  sm:hidden md:block">
        {/* <p className="text-center text-4xl"> Sticky Notes</p> */}
        <div className="col-span- p-16">
          {/* //!logo is not showing */}
          <img
            className="absolute h-[20vh] w-[20vw] rounded-2xl bg-[#fafafa] md:left-[1.5vw] lg:left-[6vw] lg:top-[6vh]"
            src="../imgs/sticky-notes-logo-color-4.png"
            alt="logo"
          />
          <div className="absolute bottom-[34vh] left-[16vw] z-30 h-[20vw] w-[20vw] rounded-2xl bg-[#bef9c8] md:bottom-[40vh] lg:h-[30vh] lg:w-[30vh]"></div>
          <div className="absolute bottom-[12vh] left-[4vw] z-20 rounded-2xl bg-[#81e0f3] md:h-[42vw] md:w-[20vw] lg:h-[26vw] lg:w-[16vw]"></div>
          <div className="absolute bottom-[8vh] left-[24vw] z-10 h-[10vW] rounded-2xl bg-[#cd32b3] md:left-[26vw] md:w-[20vw] lg:left-[22vw] lg:w-[16vw]"></div>
        </div>
      </div>
      <div className="col-span-2 flex  h-full flex-col items-center justify-center bg-white">
        {isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
};
