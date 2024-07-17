import { Button } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Home() {
    return (
        <div className="w-full h-full flex flex-col">
            Header
            <Link to="admin/user">
                <Button variant="outlined">Admin User</Button>
            </Link>
            <Outlet />
            Footer
        </div>
    );
}
