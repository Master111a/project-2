import { AvatarPNG } from "../../../assets";
import {
    DropdownAvatarMenu,
    DropdownNotificationMenu,
    SearchInput,
} from "../../../_components";
import { useEffect, useState } from "react";
export default function AdminHeader() {
    const item = {
        name: "Digital Creative",
        avatar: AvatarPNG,
    };
    const [textSearch, setTextSearch] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("search");
        setTextSearch(query || "");
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        const params = new URLSearchParams(window.location.search);
        params.set("search", textSearch);
        {
            Boolean(textSearch)
                ? window.history.replaceState(
                      {},
                      "",
                      `${window.location.pathname}?${params}`
                  )
                : window.history.replaceState({}, "", window.location.pathname);
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
