import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import AdminUser from "./pages/Admin/AdminUser/AdminUser";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import AdminUserDetail from "./pages/Admin/AdminUser/AdminUserDetail/AdminUserDetail";

function App() {
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();
    return (
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
                <Route path="" element={<div>Home</div>} />
                <Route
                    path="user-insights"
                    element={<div>user-insights</div>}
                />
                <Route path="address" element={<AdminUser />} />
                <Route path="comments" element={<AdminUser />} />
                <Route path="post" element={<AdminUser />} />
                <Route path="purchases" element={<AdminUser />} />
                <Route path="roles" element={<AdminUser />} />
                <Route path="tags" element={<AdminUser />} />
                <Route path="user" element={<AdminUser />} />
                <Route path="user/id" element={<AdminUserDetail />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default App;
