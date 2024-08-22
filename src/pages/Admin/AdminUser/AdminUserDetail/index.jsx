import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    NoDataMatched,
    SearchInput,
    UserDetailItem,
} from "../../../../_components";

export default function AdminUserDetail() {
    const [textSearch, setTextSearch] = useState("");
    const location = useLocation();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get("search");
        setTextSearch(query || "");
    }, [location.search]);

    const handleSearch = (event) => {
        event.preventDefault();
        const params = new URLSearchParams(location.search);
        params.set("search", textSearch);
        {
            textSearch
                ? history.replaceState({}, "", `${location.pathname}?${params}`)
                : history.replaceState({}, "", location.pathname);
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-3">
                <h1 className="txt-title">User Details: Digital Creative</h1>
                <UserDetailItem />
            </div>
            <div className="flex flex-col gap-y-3">
                <h1 className="txt-title">Data</h1>
                <SearchInput
                    className="bg-white"
                    placeholder="Search"
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                    onClick={(e) => handleSearch(e)}
                />
                <div className="w-full bg-white rounded-lg shadow-md">
                    <NoDataMatched />
                </div>
            </div>
        </div>
    );
}
