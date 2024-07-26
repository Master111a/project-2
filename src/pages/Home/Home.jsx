import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setUser } from "../../utils/store/auth.slice";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/admin/main");
    }, [navigate]);

    return (
        <div className="w-full h-full flex flex-col">
            <Header />
            <div className="w-full min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
