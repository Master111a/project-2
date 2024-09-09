/* eslint-disable react/prop-types */
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchInput } from "src/_components";
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
                <div className="flex items-center gap-x-2 ">
                    <span className="text-gray500">Category: </span>
                    <SearchSelect
                        disablePortal
                        options={categoryList.map((option) => option.name)}
                        onChange={(e, value) =>
                            handleSearchChange("materialCategory", value)
                        }
                        sx={{
                            borderRadius: 999,
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{
                                    borderRadius: 9999,
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    type: "text",
                                }}
                            />
                        )}
                    />
                </div>
                <Link to={"create"} className="ml-auto">
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
