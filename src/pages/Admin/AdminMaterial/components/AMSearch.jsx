/* eslint-disable react/prop-types */
import { Button, MenuItem } from "@mui/material";
import { SearchInput } from "_components";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useChangePage from "src/hooks/useChangePage";
import withCategories from "utils/hoc/withCategories";
import { SearchSelect } from "utils/styled";

const WMaterialSearch = ({ categoryList }) => {
    const [textSearch, setTextSearch] = useState();
    const [searchParams] = useSearchParams();
    const { handleSearchChange } = useChangePage();

    useEffect(() => {
        const query = searchParams.get("materialName");
        setTextSearch(query || "");
    }, [searchParams]);

    const handleSearch = (event) => {
        event.preventDefault();
        handleSearchChange("materialName", textSearch);
    };

    return (
        <div className="flex flex-col gap-y-3">
            <h2 className="font-normal text-24 text-gray500 leading-32">
                Material
            </h2>
            <div className="flex items-center gap-x-3">
                <SearchInput
                    className="bg-white"
                    placeholder="Search"
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                    onClick={(e) => handleSearch(e)}
                />
                <div className="flex items-center gap-x-2 ml-auto">
                    <span className="text-gray500">Category: </span>
                    <SearchSelect
                        id="category"
                        label=""
                        value={searchParams.get("materialCategory") || ""}
                        onChange={(e) =>
                            handleSearchChange(
                                "materialCategory",
                                e.target.value
                            )
                        }>
                        <MenuItem value={String("")}>Tất cả</MenuItem>
                        {categoryList?.map((item) => (
                            <MenuItem value={String(item.name)} key={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </SearchSelect>
                </div>
                <Link to={"create"}>
                    <Button variant="contained" className="!bg-primary">
                        <span className="font-extrabold text-sm leading-5 text-white capitalize">
                            Create Material
                        </span>
                    </Button>
                </Link>
            </div>
        </div>
    );
};
const MaterialSearch = withCategories(WMaterialSearch);

export default MaterialSearch;
