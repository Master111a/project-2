import React, { useEffect, useState } from "react";
import AMCTable from "./components/AMCTable";
import AMCSearch from "./components/AMCSearch";
import AMCStats from "./components/AMCStats";
import { getMaterialCategoryListAPI } from "../../../utils/services/admin.api";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminMaterialCategories() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const pageParams = params.get("page");
    const rowParams = params.get("row");
    const searchParams = params.get("materialCategoryName");
    const [data, setData] = useState({
        count: 0,
        categoryList: [],
    });
    const getMC = useSelector((state) => state.admin.getMC);
    const dt = {
        search: searchParams,
        row: Number(rowParams),
        page: Number(pageParams),
    };

    useEffect(() => {
        getMaterialCategoryListAPI(dt)
            .then((res) => {
                if (res?.status === 200) {
                    setData({
                        count: !Boolean(dt.search)
                            ? res?.data?.count
                            : data?.count,
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
            <AMCStats count={data.count} />
            {/* Search Input */}
            <AMCSearch />
            {/* Table */}
            <AMCTable categoryList={data.categoryList} count={data.count} />
        </div>
    );
}
