import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useSelected from "src/hooks/useSelected";
import { getMaterialListAPI } from "utils/services/admin.api";
import MaterialSearch from "./components/MaterialSearch";
import MaterialStats from "./components/MaterialStats";
import MaterialTable from "./components/MaterialTable";

export default function AdminMaterial() {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageParams = searchParams.get("page");
    const rowParams = searchParams.get("row");
    const search = searchParams.get("materialName");
    const category = searchParams.get("materialCategory");

    const [
        selectedList,
        setSelectedList,
        toggleSelection,
        isSelected,
        resetSelectedList,
    ] = useSelected();

    const [data, setData] = useState({
        count: 0,
        currentCount: 0,
        materialList: [],
    });

    const getMaterial = useSelector((state) => state.admin.getMaterial);
    const dt = {
        search: search,
        row: Number(rowParams),
        page: Number(pageParams),
        category: category,
    };

    useEffect(() => {
        resetSelectedList();
        getMaterialListAPI(dt)
            .then((res) => {
                if (res?.status === 200) {
                    setData({
                        count: !Boolean(dt.search)
                            ? res?.data?.count
                            : data?.count,
                        currentCount: res?.data?.count,
                        materialList: res?.data?.results,
                    });
                } else {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [getMaterial, dt.search, dt.row, dt.page, dt.category]);

    return (
        <div className="w-full h-full flex flex-col gap-y-6">
            {/* Stats list */}
            <MaterialStats count={data.count} />
            {/* Search Input */}
            <MaterialSearch />
            {/* Table */}
            <MaterialTable
                materialList={data.materialList}
                count={data.currentCount}
                page={Number(pageParams)}
                rowsPerPage={Boolean(rowParams) ? rowParams : 5}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
                toggleSelection={toggleSelection}
                isSelected={isSelected}
                resetSelectedList={resetSelectedList}
            />
        </div>
    );
}
