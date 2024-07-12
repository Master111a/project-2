import AdminStats from "./components/AdminStats";
import AdminUserSearch from "./components/AdminUserSearch";
import AdminUserTable from "./components/AdminUserTable";

export default function AdminUser() {
    return (
        <div className="w-full h-full flex flex-col gap-y-6">
            {/* Stats list */}
            <AdminStats />
            {/* Search Input */}
            <AdminUserSearch />
            {/* Table */}
            <AdminUserTable />
        </div>
    );
}
