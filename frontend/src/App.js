import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { FormPage } from "./pages/FormPage";
import { useEffect, useState } from "react";
import { isAuth } from "./services/utils/isAuth";
import { logout } from "./services/endpoints/users";
import { LandingPage } from "./pages/LandingPage"

export default function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsAuthenticated(await isAuth());
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }
    , [location])
  return (
    <>
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<FormPage isLogin={true} />} />
        <Route path="/signup" element={<FormPage isLogin={false} />} />
        <Route path="/landing-page" element={<LandingPage />} />
      </Routes>
    </>
  );
}
