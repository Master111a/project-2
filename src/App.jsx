import {
    Route,
    Routes,
    Navigate,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import AdminUser from "./pages/Admin/AdminUser/AdminUser";
import AdminUserDetail from "./pages/Admin/AdminUser/AdminUserDetail/AdminUserDetail";
import AdminMaterialCategories from "./pages/Admin/AdminMaterialCategories";
import { ToastContainer } from "react-toastify";
import { setUser } from "./utils/store/auth.slice";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import AMCCreate from "./pages/Admin/AdminMaterialCategories/components/AMCCreate";
import AMCDetail from "./pages/Admin/AdminMaterialCategories/components/AMCDetail";
function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state.auth.user);
    useEffect(() => {
        if (!user) {
            const tokenJson = localStorage.getItem("token");
            if (tokenJson) {
                dispatch(setUser(JSON.parse(tokenJson)));
            }
        }
    }, [user]);
    return (
        <>
            <Routes>
                {/* Home */}
                <Route path="/" element={<Home />}></Route>
                {/* Admin */}
                <Route
                    path="/admin/*"
                    element={
                        user ? (
                            <Admin />
                        ) : (
                            <Navigate to="/login" state={location.pathname} />
                        )
                    }>
                    <Route path="main" element={<div>Home</div>} />
                    <Route
                        path="user-insights"
                        element={<div>user-insights</div>}
                    />
                    <Route path="address" element={<AdminUser />} />
                    <Route path="comments" element={<AdminUser />} />
                    <Route path="post" element={<AdminUser />} />
                    <Route path="purchases" element={<AdminUser />} />
                    <Route path="roles" element={<AdminUser />} />
                    <Route
                        path="material-categories"
                        element={<AdminMaterialCategories />}
                    />
                    <Route
                        path="material-categories/create"
                        element={<AMCCreate />}
                    />
                    <Route
                        path="material-categories/:id"
                        element={<AMCDetail />}
                    />
                    <Route path="user" element={<AdminUser />} />
                    <Route path="user/id" element={<AdminUserDetail />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
