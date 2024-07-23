import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setUser } from "../../utils/store/auth.slice";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    useEffect(() => {
        if (!user) {
            let userJson = localStorage.getItem("token");
            dispatch(setUser(JSON.parse(userJson)));
        }
    }, [user]);

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
