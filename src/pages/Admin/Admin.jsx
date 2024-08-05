import AdminHeader from "./components/AdminHeader";
import AdminAside from "./components/AdminAside";
import AdminContent from "./components/AdminContent";
import AdminFooter from "./components/AdminFooter";

export default function Admin() {
    return (
        <div className="w-full h-full min-h-screen flex bg-background">
            <AdminAside />
            <div className="flex flex-col w-4/5">
                <AdminHeader />
                <AdminContent />
                <AdminFooter />
            </div>
        </div>
    );
}
