import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useSelected from "src/hooks/useSelected";
import { convertPage } from "utils/function/function";
import { getMaterialListAPI } from "utils/services/admin.api";
import MaterialSearch from "./components/AMSearch";
import MaterialStats from "./components/AMStats";
import MaterialTable from "./components/AMTable";

export default function AdminMaterial() {
    const [searchParams] = useSearchParams();

    const pageParams = convertPage(searchParams.get("page"));
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dt = {
        search: search,
        row: rowParams,
        page: pageParams,
        category: category,
    };

    useEffect(() => {
        resetSelectedList();
        getMaterialListAPI({
            search: dt.search,
            row: dt.row,
            page: dt.page,
            category: dt?.category,
        })
            .then((res) => {
                setData({
                    count:
                        !dt.search || !dt.category
                            ? res?.data?.count
                            : data?.count,
                    currentCount: res?.data?.count,
                    materialList: res?.data?.results,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [
        getMaterial,
        dt.search,
        dt.row,
        dt.page,
        dt.category,
        resetSelectedList,
        data?.count,
    ]);

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
                rowsPerPage={rowParams ? rowParams : 5}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
                toggleSelection={toggleSelection}
                isSelected={isSelected}
                resetSelectedList={resetSelectedList}
            />
        </div>
    );
}
