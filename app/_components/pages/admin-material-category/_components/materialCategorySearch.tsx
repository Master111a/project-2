import { SearchInput } from "@/_components/ui/input";
import useChangeParams from "@/_hook/useChangeParams";
import { Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

const MaterialCategorySearch = () => {
    const { handleSearchChange, getSearchParams } = useChangeParams();
    const search = getSearchParams("materialCategoryName") || "";
    const [textSearch, setTextSearch] = useState<string | null>(search);
    useEffect(() => {
        setTextSearch(search);
    }, [search]);
    return (
        <div className="flex flex-col gap-y-3">
            <h2 className="font-normal text-24 text-gray500 leading-32">
                Material Category
            </h2>
            <div className="flex items-center gap-x-3">
                <SearchInput
                    className="bg-white"
                    placeholder="Search"
                    value={textSearch || ""}
                    onChange={(e) => setTextSearch(e.target.value)}
                    onSubmit={() =>
                        handleSearchChange("materialCategoryName", textSearch)
                    }
                />

                <Link
                    href={"/admin/material-category/create-material-category"}
                    className="ml-auto">
                    <Button variant="contained" className="!bg-primary">
                        <span className="font-extrabold text-sm leading-5 text-white capitalize">
                            Create Category
                        </span>
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default MaterialCategorySearch;
