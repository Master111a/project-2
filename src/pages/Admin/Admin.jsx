import React from "react";
import AdminHeader from "./components/AdminHeader";
import AdminAside from "./components/AdminAside";
import AdminContent from "./components/AdminContent";

export default function Admin() {
    return (
        <div className="w-full h-full min-h-screen flex bg-background">
            <AdminAside />
            <div className="flex flex-col w-full">
                <AdminHeader />
                <AdminContent />
            </div>
        </div>
    );
}
