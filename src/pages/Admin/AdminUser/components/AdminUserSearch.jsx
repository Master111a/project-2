import React from "react";
import { SearchInput } from "../../../../_components";
import { Button } from "@mui/material";

export default function AdminUserSearch() {
    return (
        <div className="flex flex-col gap-y-3">
            <h2 className="font-normal text-24 text-gray500 leading-32">
                Users
            </h2>
            <div className="flex items-center justify-between">
                <SearchInput className="bg-white" placeholder="Search" />
                <Button variant="contained" className="!bg-primary">
                    <span className="font-extrabold text-sm leading-5 text-white capitalize">
                        Create User
                    </span>
                </Button>
            </div>
        </div>
    );
}
