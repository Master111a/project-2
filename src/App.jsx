import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import AdminUser from "./pages/Admin/AdminUser/AdminUser";
import Login from "./pages/Login/Login";
import { useState } from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<Home />}></Route>
            {/* Admin */}
            <Route
                path="/admin/*"
                element={isLoggedIn ? <Admin /> : <Navigate to="/login" />}>
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
            </Route>
            <Route
                path="/login"
                element={
                    <Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
                }
            />
        </Routes>
    );
}

export default App;
