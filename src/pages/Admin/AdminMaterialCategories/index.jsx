import { useEffect, useState } from "react";
import AMCTable from "./components/AMCTable";
import AMCSearch from "./components/AMCSearch";
import AMCStats from "./components/AMCStats";
import { getMaterialCategoryListAPI } from "../../../utils/services/admin.api";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useSelected from "../../../hooks/useSelected";

export default function AdminMaterialCategories() {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageParams = searchParams.get("page");
    const rowParams = searchParams.get("row");
    const search = searchParams.get("materialCategoryName");

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
        categoryList: [],
    });

    const getMC = useSelector((state) => state.admin.getMC);
    const dt = {
        search: search,
        row: Number(rowParams),
        page: Number(pageParams),
    };

    useEffect(() => {
        resetSelectedList([]);
        getMaterialCategoryListAPI(dt)
            .then((res) => {
                if (res?.status === 200) {
                    setData({
                        count: !Boolean(dt.search)
                            ? res?.data?.count
                            : data?.count,
                        currentCount: res?.data?.count,
                        categoryList: res?.data?.results,
                    });
                } else {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [getMC, dt.search, dt.row, dt.page, data?.count]);

    return (
        <div className="w-full h-full flex flex-col gap-y-6">
            {/* Stats list */}
            <AMCStats
                count={data.count !== 0 ? data.count : data.currentCount}
            />
            {/* Search Input */}
            <AMCSearch />
            {/* Table */}
            <AMCTable
                categoryList={data.categoryList}
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
