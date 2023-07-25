import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { FormPage } from "./pages/FormPage";
import { useEffect, useState } from "react";
import { isAuth } from "./services/utils/isAuth";
import { logout } from "./services/endpoints/users";
export default function App() {
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(()=>{
    const checkAuth = async() => {
      try{
      setAuthenticated(await isAuth());
      }catch(error){
        console.error(error);
        setAuthenticated(false);
      }
    }
  checkAuth();
  }
  ,[location])
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<FormPage isLogin = {true} />} />
        <Route path="/signup" element={<FormPage isLogin={false} />} />
      </Routes>
    </>
  );
}
