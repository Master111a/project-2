import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login({ isLoggedIn, handleLogin }) {
    const navigate = useNavigate();
    const location = useLocation();
    const onClick = () => {
        if (location?.state) {
            navigate(location?.state);
        } else {
            navigate("/");
        }
    };
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Button onClick={onClick}>Login</Button>
        </div>
    );
}
