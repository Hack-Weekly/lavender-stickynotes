import { Login } from "../components/Login";
import { Signup } from "../components/Signup";

export const FormPage = ({isLogin}) => {
  return (
    <div className="h-screen w-screen grid grid-cols-3">
      <div className="h-full  col-span-1 bg-pink-300">
        <p className="text-center text-4xl"> Sticky Notes</p>
      </div>
      <div className="h-full col-span-2  bg-white flex flex-col justify-center items-center">
        { isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
};
