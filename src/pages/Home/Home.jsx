import React from "react";
import { Outlet } from "react-router-dom";

export default function Home() {
    return (
        <div className="w-full h-full ">
            Header
            <Outlet />
            Footer
        </div>
    );
}
