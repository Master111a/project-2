import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    DropdownAvatarMenu,
    DropdownNotificationMenu,
    SearchInput,
} from "../../../_components";
import { AvatarPNG } from "../../../assets";
export default function AdminHeader() {
    const location = useLocation();

    const item = {
        name: "Digital Creative",
        avatar: AvatarPNG,
    };
    const [textSearch, setTextSearch] = useState("");

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
            textSearch
                ? history.replaceState({}, "", `${location.pathname}?${params}`)
                : history.replaceState({}, "", location.pathname);
        }
    };
    return (
        <div className="flex items-center px-12 py-2 bg-white">
            <SearchInput
                className="bg-background"
                placeholder="Press / to search"
                value={textSearch}
                onChange={(e) => setTextSearch(e.target.value)}
                onClick={(e) => handleSearch(e)}
            />
            <div className="flex ml-auto items-center">
                <DropdownNotificationMenu />
                <DropdownAvatarMenu item={item} />
            </div>
        </div>
    );
}
