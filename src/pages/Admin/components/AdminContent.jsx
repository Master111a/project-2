import { Outlet } from "react-router-dom";
export default function AdminContent() {
    return (
        <div className="w-full h-full py-8 px-12 bg-background">
            <Outlet />
        </div>
    );
}
