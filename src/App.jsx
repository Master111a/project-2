import {
    Admin,
    AdminMaterial,
    AdminMaterialCategories,
    AdminMaterialCreate,
    AdminMaterialDetail,
    AdminUser,
    AdminUserDetail,
    AMCCreate,
    AMCEdit,
} from "pages/Admin";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

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
                            <Navigate to="/Login" state={location.pathname} />
                        )
                    }>
                    <Route path="main" element={<div>Home</div>} />
                    <Route path="material" element={<AdminMaterial />} />
                    <Route
                        path="material/create"
                        element={<AdminMaterialCreate />}
                    />
                    <Route
                        path="material/:id"
                        element={<AdminMaterialDetail />}
                    />
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
                        element={<AMCEdit />}
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
