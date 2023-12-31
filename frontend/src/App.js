import { Route, Routes, useLocation } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { FormPage } from "./pages/FormPage";
import { useEffect, useState } from "react";
import { isAuth } from "./services/utils/isAuth";
import { Profile } from "./pages/Profile";
import { TeamPage } from "./pages/TeamPage";
import { Spinner } from "@material-tailwind/react";
import { Teams } from "./pages/Teams";
import { getProfile } from "./services/endpoints/users";
import { ProjectPage } from "./pages/ProjectPage";
import { LandingPage } from "./pages/LandingPage";
export default function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  useEffect(() => {
    setIsLoading(true);
    const checkAuth = async () => {
      try {
        setIsAuthenticated(await isAuth());
        const res = await getProfile();
        setUsername(res.profile.username);
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [location]);
  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard username={username} />:<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard username={username} />
            ) : (
              <FormPage isLogin={true} />
            )
          }
        />
        <Route path="/login" element={<FormPage isLogin={true} />} />
        <Route path="/signup" element={<FormPage isLogin={false} />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile username={username} /> : <FormPage isLogin={true} />}
        />
        <Route
          path="/teams"
          element={
            isAuthenticated ? <Teams username={username} /> : <FormPage isLogin={true} />
          }
        />{" "}
        <Route
          path="/teams/:teamSlug/"
          element={isAuthenticated ? <TeamPage /> : <FormPage isLogin={true} />}
        />
        <Route
          path="/teams/:teamSlug/projects/:projectId"
          element={isAuthenticated ? <ProjectPage /> : <FormPage isLogin={true} />}
        />
        <Route path="*" element={<FormPage isLogin={true} />} />
      </Routes>
    </>
  );
}
