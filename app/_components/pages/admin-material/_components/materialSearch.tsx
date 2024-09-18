import { SearchInput } from "@/_components/ui/input";
import withCategories from "@/_hoc/withCategories";
import useChangeParams from "@/_hook/useChangeParams";
import { CategoryInListType } from "@/_types/material";
import {
    Autocomplete,
    AutocompleteProps,
    Button,
    TextField,
} from "@mui/material";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";

const autoCompleteStyle: AutocompleteProps<
    string,
    boolean,
    boolean,
    boolean
>["sx"] = {
    width: "260px",
    border: "1px solid #f1f5f9",
    "& .MuiAutocomplete-inputRoot": {
        padding: "0px 10px",
        backgroundColor: "#ffffff",
        borderRadius: "9999px",
    },
    "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
        padding: "4px",
    },
};
const WMaterialSearch = ({
    categoryList,
}: {
    categoryList: CategoryInListType[];
}) => {
    const { handleSearchChange, getSearchParams } = useChangeParams();
    const search = getSearchParams("materialName") || "";
    const [textSearch, setTextSearch] = useState<string | null>(search);
    useEffect(() => {
        setTextSearch(search);
    }, [search]);
    return (
        <div className="flex flex-col gap-y-3">
            <h2 className="font-normal text-24 text-gray500 leading-32">
                Material
            </h2>
            <div className="flex items-center gap-x-3">
                <SearchInput
                    className="bg-white"
                    placeholder="Search"
                    value={textSearch || ""}
                    onChange={(e) => setTextSearch(e.target.value)}
                    onSubmit={() =>
                        handleSearchChange("materialName", textSearch)
                    }
                />
                <div className="flex items-center gap-x-2 ">
                    <span className="text-gray500">Category: </span>
                    <Autocomplete
                        disablePortal
                        options={categoryList.map((option) => option.name)}
                        onChange={(
                            e: SyntheticEvent<Element, Event>,
                            value: string | null | undefined
                        ) => handleSearchChange("materialCategory", value)}
                        sx={autoCompleteStyle}
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
                <Link
                    href={"/admin/material/create-material"}
                    className="ml-auto">
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
