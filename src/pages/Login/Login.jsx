import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setUser } from "../../utils/store/auth.slice";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const onClick = () => {
        dispatch(setUser("nam"));
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
