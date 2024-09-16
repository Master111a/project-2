"use client";

import MaterialStats from "@/_components/pages/admin-material/_components/materialStats";
import MaterialTable from "@/_components/pages/admin-material/_components/materialTable";
import useChangeParams from "@/_hook/useChangeParams";
import useSelected from "@/_hook/useSelected";
import { ROUTER_API } from "@/_routers";
import { getAPI } from "@/_utils/axios";
import { validateNumber } from "@/_utils/checkNumber";
// @mui
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

type DataProps = {
    count: number;
    currentCount: number;
    materialList: [];
};
const AdminMaterial = () => {
    const { getSearchParams } = useChangeParams();

    const pageParams = validateNumber(getSearchParams("page"));
    const rowParams = getSearchParams("row") || 5;
    const search = getSearchParams("materialName");
    const category = getSearchParams("materialCategory");
    const [
        selectedList,
        setSelectedList,
        toggleSelection,
        isSelected,
        resetSelectedList,
    ] = useSelected();

    const [data, setData] = useState<DataProps>({
        count: 0,
        currentCount: 0,
        materialList: [],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dt = {
        search: search,
        row: rowParams,
        page: pageParams,
        category: category,
    };

    useEffect(() => {
        resetSelectedList();
        getAPI([
            ROUTER_API.material,
            {
                params: {
                    search: dt.search,
                    limit: dt.row,
                    offset: Number(dt.row) * Number(dt.page - 1),
                    category: dt?.category,
                },
            },
        ])
            .then((res) => {
                setData({
                    count:
                        !dt.search || !dt.category ? res?.count : data?.count,
                    currentCount: res?.count,
                    materialList: res?.results,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [
        data?.count,
        dt.category,
        dt.page,
        dt.row,
        dt.search,
        resetSelectedList,
    ]);

    return (
        <Box className="w-full h-full flex flex-col gap-y-6">
            <MaterialStats count={0} />
            <MaterialTable
                materialList={data.materialList}
                count={data.currentCount}
                page={Number(pageParams)}
                rowsPerPage={rowParams ? rowParams : 5}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
                toggleSelection={toggleSelection}
                isSelected={isSelected}
                resetSelectedList={resetSelectedList}
            />
        </Box>
    );
};
export default AdminMaterial;
