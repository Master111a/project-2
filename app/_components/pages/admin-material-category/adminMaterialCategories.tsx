"use client";

import MaterialCategorySearch from "@/_components/pages/admin-material-category/_components/materialCategorySearch";
import MaterialCategoryTable from "@/_components/pages/admin-material-category/_components/materialCategoryTable";
import useChangeParams from "@/_hook/useChangeParams";
import useSelected from "@/_hook/useSelected";
import { ROUTER_API } from "@/_routers";
import { getAPI } from "@/_utils/axios";
import { validateNumber } from "@/_utils/checkNumber";
// @mui
import { Box } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
type DataProps = {
    count: number;
    currentCount: number;
    materiaCategorylList: [];
};
const AdminMaterialCategories = () => {
    const { getSearchParams } = useChangeParams();

    const pageParams = validateNumber(getSearchParams("page"));
    const rowParams = getSearchParams("row") || 5;
    const search = getSearchParams("materialCategoryName");

    const [
        selectedList,
        setSelectedList,
        toggleSelection,
        isSelected,
        resetSelectedList,
    ] = useSelected();

    const [isGetList, setIsGetList] = useState<boolean>(false);
    const [data, setData] = useState<DataProps>({
        count: 0,
        currentCount: 0,
        materiaCategorylList: [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dt = {
        search: search,
        row: rowParams,
        page: pageParams,
    };

    useEffect(() => {
        resetSelectedList();
        getAPI([
            ROUTER_API.materialCategory,
            {
                params: {
                    search: dt.search,
                    limit: dt.row,
                    offset:
                        Number(dt.row) * Number(dt.page > 1 ? dt.page - 1 : 0),
                },
            },
        ])
            .then((res) => {
                setData({
                    count: !dt.search ? res?.count : data?.count,
                    currentCount: res?.count,
                    materiaCategorylList: res?.results,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [isGetList, data?.count, dt.page, dt.row, dt.search, resetSelectedList]);

    return (
        <Box className="w-full h-full flex flex-col gap-y-6">
            <MaterialCategorySearch />
            <Suspense fallback={<div>Loading...</div>}>
                <MaterialCategoryTable
                    materiaCategorylList={data.materiaCategorylList}
                    count={data.currentCount}
                    page={Number(pageParams)}
                    rowsPerPage={rowParams ? rowParams : 5}
                    selectedList={selectedList}
                    setSelectedList={setSelectedList}
                    toggleSelection={toggleSelection}
                    isSelected={isSelected}
                    resetSelectedList={resetSelectedList}
                    setIsGetList={setIsGetList}
                />
            </Suspense>
        </Box>
    );
};
export default AdminMaterialCategories;
