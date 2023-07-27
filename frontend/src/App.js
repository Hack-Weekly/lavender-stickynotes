import { Route, Routes, useLocation } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { FormPage } from "./pages/FormPage";
import { useEffect, useState } from "react";
import { isAuth } from "./services/utils/isAuth";
import { getProfile } from "./services/endpoints/users";
import { Profile } from "./pages/Profile";
export default function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(()=>{
    const checkAuth = async() => {
      try{
      setIsAuthenticated(await isAuth());
      
      }catch(error){
        console.error(error);
        setIsAuthenticated(false);
      }
    }
  checkAuth();
  }
  ,[location])
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<FormPage isLogin={true} />} />
        <Route path="/signup" element={<FormPage isLogin={false} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<FormPage isLogin={true} />} />
      </Routes>
    </>
  );
}
