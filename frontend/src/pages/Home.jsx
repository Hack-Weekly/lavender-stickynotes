import { Link, useNavigate} from "react-router-dom";
import { logout } from "../services/endpoints/users";
import { Button } from "@material-tailwind/react";
export const Home =  ({isAuthenticated}) => {
    const navigate = useNavigate();
    const HandleLogout =  () => {
        logout();
        navigate("/");
    }
    return(
        <>
        { !isAuthenticated ?  (
            <>
            <Link to="/login">
                <p className="text-3xl underline">Login</p>
            </Link>
             <Link to="/signup">
                <p className="text-3xl underline">Sign up</p>
            </Link>
            </>
        )
            : (<>
                <p className="text-3xl">Welcome !</p>
                <Button onClick={HandleLogout}>Logout</Button>
               </>
            )
        }
        </>
    )
}