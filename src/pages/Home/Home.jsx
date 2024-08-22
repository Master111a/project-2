import Footer from "pages/Home/components/Footer";
import Header from "pages/Home/components/Header";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

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
