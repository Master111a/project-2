"use client";

import {
    DropdownAvatarMenu,
    DropdownNotificationMenu,
} from "@/_components/ui/customs";
import { SearchInput } from "@/_components/ui/input";
import globalConfig from "@/_config";
import useChangeParams from "@/_hook/useChangeParams";
import { Box } from "@mui/material";
import { useState } from "react";

const item = {
    name: "Digital Creative",
    avatar: `${globalConfig.assetUrl}/images/avatar.gif`,
};
export default function AdminHeader() {
    const { handleSearchChange, getSearchParams } = useChangeParams();
    const [textSearch, setTextSearch] = useState<string | null>(
        getSearchParams("search")
    );

    return (
        <Box className="flex items-center px-12 py-2 bg-white">
            <SearchInput
                className="bg-background"
                placeholder="Press / to search"
                value={textSearch || ""}
                onChange={(e) => setTextSearch(e.target.value)}
                onSubmit={() => handleSearchChange("search", textSearch)}
            />
            <Box className="flex ml-auto items-center">
                <DropdownNotificationMenu />
                <DropdownAvatarMenu item={item} />
            </Box>
        </Box>
    );
}
