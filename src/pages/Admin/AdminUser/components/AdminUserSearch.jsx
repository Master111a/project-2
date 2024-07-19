import { useEffect, useState } from "react";
import { SearchInput } from "../../../../_components";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminUserSearch() {
    const [textSearch, setTextSearch] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get("search");
        setTextSearch(query || "");
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        const params = new URLSearchParams(location.search);
        params.set("search", textSearch);
        {
            Boolean(textSearch)
                ? navigate(`${location.pathname}?${params}`, { replace: true })
                : navigate(location.pathname, { replace: true });
        }
    };
    return (
        <div className="flex flex-col gap-y-3">
            <h2 className="font-normal text-24 text-gray500 leading-32">
                Users
            </h2>
            <div className="flex items-center justify-between">
                <SearchInput
                    className="bg-white"
                    placeholder="Search"
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                    onClick={(e) => handleSearch(e)}
                />
                <Button variant="contained" className="!bg-primary">
                    <span className="font-extrabold text-sm leading-5 text-white capitalize">
                        Create User
                    </span>
                </Button>
            </div>
        </div>
    );
}
